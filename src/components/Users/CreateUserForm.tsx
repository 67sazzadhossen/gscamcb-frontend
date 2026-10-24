'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import type { TCreateUserPayload, TUser } from '@/types/index.type';

type RoleOption = TUser['role'];

const ALL_ROLES: { value: RoleOption; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
  { value: 'STAFF', label: 'Staff Member' },
  { value: 'STUDENT', label: 'Student' },
];

export default function CreateUserForm({
  initialRole,
  title,
}: {
  initialRole?: RoleOption;
  title?: string;
}) {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  // Allowed roles based on permission:
  // Super Admin can add all roles; Admin can add all roles EXCEPT Admin and Super Admin
  const availableRoles = isSuperAdmin
    ? ALL_ROLES
    : ALL_ROLES.filter((r) => r.value !== 'SUPER_ADMIN' && r.value !== 'ADMIN');

  const defaultRole =
    initialRole && availableRoles.some((r) => r.value === initialRole)
      ? initialRole
      : availableRoles[0]?.value || 'TEACHER';

  const [role, setRole] = useState<RoleOption>(defaultRole);
  const [shift, setShift] = useState<'MORNING' | 'DAY'>('MORNING');
  const [createdUser, setCreatedUser] = useState<TUser | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bengaliFirstName, setBengaliFirstName] = useState('');
  const [bengaliMiddleName, setBengaliMiddleName] = useState('');
  const [bengaliLastName, setBengaliLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER' | ''>('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');

  // Employment fields
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [joiningDate, setJoiningDate] = useState('');

  // Student fields
  const [version, setVersion] = useState<'BANGLA' | 'ENGLISH'>('BANGLA');
  const [isCadet, setIsCadet] = useState(false);
  const [birthRegistrationNumber, setBirthRegistrationNumber] = useState('');
  const [guardianFirstName, setGuardianFirstName] = useState('');
  const [guardianLastName, setGuardianLastName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('Father');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianOccupation, setGuardianOccupation] = useState('');

  const isStudent = role === 'STUDENT';

  // If regular admin tries to access super admin or admin creation directly
  if (
    !isSuperAdmin &&
    (initialRole === 'SUPER_ADMIN' || initialRole === 'ADMIN')
  ) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-800">
        <h2 className="text-xl font-bold">Access Restricted</h2>
        <p className="mt-2 text-sm text-red-600">
          Only a Super Admin has permission to add or manage administrators.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-5 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('First Name and Last Name are required');
      return;
    }

    if (!isStudent && !email.trim()) {
      toast.error('Email is required for staff and administrative accounts');
      return;
    }

    if (!isStudent && !designation.trim()) {
      toast.error('Designation is required for employee accounts');
      return;
    }

    const payload: TCreateUserPayload = {
      role,
      email: email.trim() || undefined,
      password: password.trim() || undefined,
      profile: {
        shift,
        name: {
          firstName: firstName.trim(),
          middleName: middleName.trim() || undefined,
          lastName: lastName.trim(),
          bengaliFirstName: bengaliFirstName.trim() || undefined,
          bengaliMiddleName: bengaliMiddleName.trim() || undefined,
          bengaliLastName: bengaliLastName.trim() || undefined,
        },
        phone: phone.trim() || undefined,
        gender: (gender as 'MALE' | 'FEMALE' | 'OTHER') || undefined,
        bloodGroup:
          (bloodGroup as TCreateUserPayload['profile']['bloodGroup']) ||
          undefined,
        dateOfBirth: dateOfBirth || undefined,
        presentAddress: presentAddress.trim()
          ? { addressLine: presentAddress.trim() }
          : undefined,
        permanentAddress: permanentAddress.trim()
          ? { addressLine: permanentAddress.trim() }
          : undefined,
        ...(isStudent
          ? {
              studentInfo: {
                version,
                isCadet,
                birthRegistrationNumber:
                  birthRegistrationNumber.trim() || undefined,
                ...(guardianFirstName.trim() && guardianLastName.trim()
                  ? {
                      guardian: {
                        name: {
                          firstName: guardianFirstName.trim(),
                          lastName: guardianLastName.trim(),
                        },
                        relationship: guardianRelationship.trim() || undefined,
                        phone: guardianPhone.trim() || undefined,
                        occupation: guardianOccupation.trim() || undefined,
                      },
                    }
                  : {}),
              },
            }
          : {
              employmentInfo: {
                designation: designation.trim(),
                department: department.trim() || undefined,
                monthlySalary: monthlySalary
                  ? Number(monthlySalary)
                  : undefined,
                joiningDate: joiningDate || undefined,
              },
            }),
      },
    };

    try {
      const response = await createUser(payload).unwrap();
      toast.success(
        `User created successfully! School ID: ${response.data.userId}`,
      );
      setCreatedUser(response.data);
    } catch (err: unknown) {
      const errorObj = err as {
        data?: { message?: string; errorSources?: { message?: string }[] };
      };
      const message =
        errorObj?.data?.message ||
        errorObj?.data?.errorSources?.[0]?.message ||
        'Failed to create user. Please check the inputs.';
      toast.error(message);
    }
  }

  function handleReset() {
    setCreatedUser(null);
    setEmail('');
    setPassword('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setBengaliFirstName('');
    setBengaliMiddleName('');
    setBengaliLastName('');
    setPhone('');
    setGender('');
    setBloodGroup('');
    setDateOfBirth('');
    setPresentAddress('');
    setPermanentAddress('');
    setDesignation('');
    setDepartment('');
    setMonthlySalary('');
    setJoiningDate('');
    setBirthRegistrationNumber('');
    setGuardianFirstName('');
    setGuardianLastName('');
    setGuardianPhone('');
    setGuardianOccupation('');
  }

  if (createdUser) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-600">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900">
            Account Created Successfully!
          </h2>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-sm font-medium text-slate-500">
              8-Digit School ID
            </span>
            <span className="text-base font-mono font-bold text-school-blue">
              {createdUser.userId}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-sm font-medium text-slate-500">
              Full Name
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {createdUser.profile?.name?.firstName}{' '}
              {createdUser.profile?.name?.lastName}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-sm font-medium text-slate-500">Role</span>
            <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800">
              {createdUser.role}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-slate-500">Email</span>
            <span className="text-sm text-slate-800">
              {createdUser.email || 'N/A (Default School Password applies)'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl bg-school-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
          >
            Add Another User
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900">
          {title || `Add New ${role.replace('_', ' ').toLowerCase()}`}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below to generate a new 8-digit School ID account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Account & Role Configuration */}
        <section>
          <h2 className="text-base font-bold text-slate-800">
            1. Account Configuration
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                User Role *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleOption)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              >
                {availableRoles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Shift *
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as 'MORNING' | 'DAY')}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              >
                <option value="MORNING">Morning Shift (Code 1)</option>
                <option value="DAY">Day Shift (Code 2)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Email Address {!isStudent && '*'}
              </label>
              <input
                type="email"
                value={email}
                required={!isStudent}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  isStudent ? 'Optional for students' : 'Required for staff'
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Initial Password (Optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank for default password"
                minLength={8}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* English & Bengali Names */}
        <section>
          <h2 className="text-base font-bold text-slate-800">
            2. Personal Name
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Md"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Middle Name
              </label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="e.g. Sazzad"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Hossen"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                বাংলা ১ম নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={bengaliFirstName}
                onChange={(e) => setBengaliFirstName(e.target.value)}
                placeholder="যেমন: মোঃ"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                বাংলা মধ্যম নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={bengaliMiddleName}
                onChange={(e) => setBengaliMiddleName(e.target.value)}
                placeholder="যেমন: সাজ্জাদ"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                বাংলা শেষ নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={bengaliLastName}
                onChange={(e) => setBengaliLastName(e.target.value)}
                placeholder="যেমন: হোসেন"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Contact & Personal Information */}
        <section>
          <h2 className="text-base font-bold text-slate-800">
            3. Contact & Details
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01700000000"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as 'MALE' | 'FEMALE' | 'OTHER' | '')
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              >
                <option value="">Select Blood Group</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Present Address
              </label>
              <input
                type="text"
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                placeholder="House, Road, City, District"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Permanent Address
              </label>
              <input
                type="text"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                placeholder="Village / Town, Upazila, District"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Role Specific Section: Student vs Employee */}
        {isStudent ? (
          <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
            <h2 className="text-base font-bold text-school-blue">
              4. Student Information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Curriculum Version
                </label>
                <select
                  value={version}
                  onChange={(e) =>
                    setVersion(e.target.value as 'BANGLA' | 'ENGLISH')
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                >
                  <option value="BANGLA">Bangla Medium</option>
                  <option value="ENGLISH">English Version</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Birth Registration No.
                </label>
                <input
                  type="text"
                  value={birthRegistrationNumber}
                  onChange={(e) => setBirthRegistrationNumber(e.target.value)}
                  placeholder="17-digit certificate number"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={isCadet}
                    onChange={(e) => setIsCadet(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-school-blue focus:ring-school-blue"
                  />
                  Is Cadet Student
                </label>
              </div>

              <div className="sm:col-span-3 border-t border-blue-200/60 pt-4 mt-2">
                <h3 className="text-sm font-bold text-slate-800">
                  Guardian Information
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Guardian First Name
                    </label>
                    <input
                      type="text"
                      value={guardianFirstName}
                      onChange={(e) => setGuardianFirstName(e.target.value)}
                      placeholder="First Name"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Guardian Last Name
                    </label>
                    <input
                      type="text"
                      value={guardianLastName}
                      onChange={(e) => setGuardianLastName(e.target.value)}
                      placeholder="Last Name"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={guardianRelationship}
                      onChange={(e) => setGuardianRelationship(e.target.value)}
                      placeholder="Father, Mother, etc."
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">
                      Guardian Phone
                    </label>
                    <input
                      type="tel"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      placeholder="01700000000"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-800">
              4. Employment Details
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Designation *
                </label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Teacher, Accountant"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Science, Accounts, Administration"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Monthly Salary (BDT)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                  placeholder="e.g. 25000"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-school-blue"
                />
              </div>
            </div>
          </section>
        )}

        <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-school-blue px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-900 disabled:opacity-60"
          >
            {isLoading ? 'Creating Account…' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}
