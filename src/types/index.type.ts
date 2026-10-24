export type TUser = {
  id: string;
  userId: string;
  email: string | null;
  role:
    'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ACCOUNTANT' | 'STAFF';
  status?: 'ACTIVE' | 'BLOCKED';
  isDeleted?: boolean;
  mustChangePassword: boolean;
  profile: {
    shift?: 'MORNING' | 'DAY';
    image?: { displayUrl: string; publicId: string } | null;
    name: {
      firstName: string;
      middleName?: string | null;
      lastName: string;
      bengaliFirstName?: string | null;
      bengaliMiddleName?: string | null;
      bengaliLastName?: string | null;
    };
    phone?: string | null;
    gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
    bloodGroup?: string | null;
    dateOfBirth?: string | null;
    presentAddress?: { addressLine: string } | null;
    permanentAddress?: { addressLine: string } | null;
    employmentInfo?: {
      designation: string;
      department?: string | null;
      monthlySalary?: number | null;
      joiningDate?: string | null;
      employmentStatus?: string | null;
    } | null;
    studentInfo?: {
      version?: 'BANGLA' | 'ENGLISH' | null;
      isCadet?: boolean;
      birthRegistrationNumber?: string | null;
    } | null;
  } | null;
};

export type TCreateUserPayload = {
  email?: string;
  password?: string;
  role:
    'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ACCOUNTANT' | 'STAFF';
  profile: {
    shift: 'MORNING' | 'DAY';
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
      bengaliFirstName?: string;
      bengaliMiddleName?: string;
      bengaliLastName?: string;
    };
    phone?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    bloodGroup?:
      | 'A_POSITIVE'
      | 'A_NEGATIVE'
      | 'B_POSITIVE'
      | 'B_NEGATIVE'
      | 'AB_POSITIVE'
      | 'AB_NEGATIVE'
      | 'O_POSITIVE'
      | 'O_NEGATIVE';
    dateOfBirth?: string;
    presentAddress?: { addressLine: string };
    permanentAddress?: { addressLine: string };
    employmentInfo?: {
      designation: string;
      department?: string;
      monthlySalary?: number;
      joiningDate?: string;
    };
    studentInfo?: {
      version?: 'BANGLA' | 'ENGLISH';
      isCadet?: boolean;
      birthRegistrationNumber?: string;
      guardian?: {
        name: { firstName: string; lastName: string };
        relationship?: string;
        phone?: string;
        occupation?: string;
      };
    };
  };
};

export type TResponse<T> = { success: boolean; message: string; data: T };
export type THealth = { status: 'ok'; service: string; uptime: number };
