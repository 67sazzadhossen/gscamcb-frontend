import type { TUser } from '@/types/index.type';
export type UserRole = TUser['role'];
export type NavigationItem = {
  label: string;
  href: string;
  roles: UserRole[];
  available?: boolean;
};
export type NavigationGroup = { label: string; items: NavigationItem[] };
const allRoles: UserRole[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'TEACHER',
  'STUDENT',
  'ACCOUNTANT',
  'STAFF',
];
const administrators: UserRole[] = ['SUPER_ADMIN', 'ADMIN'];
const financeRoles: UserRole[] = [...administrators, 'ACCOUNTANT'];
const employeeRoles: UserRole[] = [
  ...administrators,
  'TEACHER',
  'ACCOUNTANT',
  'STAFF',
];
const academicRoles: UserRole[] = [...administrators, 'TEACHER', 'STUDENT'];
export const dashboardNavigation: NavigationItem[] = [
  { label: 'Overview', href: '/dashboard', roles: allRoles, available: true },
  {
    label: 'My profile',
    href: '/dashboard/profile',
    roles: allRoles,
    available: true,
  },
];
const roleGroups: {
  label: string;
  singular: string;
  path: string;
  roles: UserRole[];
  recyclable?: boolean;
}[] = [
  {
    label: 'Super admins',
    singular: 'super admin',
    path: 'super-admins',
    roles: ['SUPER_ADMIN'],
    recyclable: true,
  },
  {
    label: 'Admins',
    singular: 'admin',
    path: 'administrators',
    roles: ['SUPER_ADMIN'],
    recyclable: true,
  },
  {
    label: 'Teachers',
    singular: 'teacher',
    path: 'teachers',
    roles: administrators,
    recyclable: true,
  },
  {
    label: 'Accountants',
    singular: 'accountant',
    path: 'accountants',
    roles: administrators,
    recyclable: true,
  },
  {
    label: 'Staff',
    singular: 'staff member',
    path: 'staff',
    roles: administrators,
    recyclable: true,
  },
];
const groups: NavigationGroup[] = [
  ...roleGroups.map(({ label, singular, path, roles, recyclable }) => ({
    label,
    items: [
      { label: `Add ${singular}`, href: `/dashboard/${path}/create`, roles },
      {
        label: `All ${label.toLowerCase()}`,
        href: `/dashboard/${path}`,
        roles,
      },
      ...(recyclable
        ? [
            {
              label: 'Recycle bin',
              href: `/dashboard/${path}/recycle-bin`,
              roles,
            },
          ]
        : []),
    ],
  })),
  {
    label: 'Students',
    items: [
      {
        label: 'Recycle bin',
        href: '/dashboard/students/recycle-bin',
        roles: administrators,
      },
      {
        label: 'Add student',
        href: '/dashboard/students/create',
        roles: [...administrators, 'TEACHER'],
      },
      {
        label: 'All students',
        href: '/dashboard/students',
        roles: administrators,
      },
      {
        label: 'Collected students',
        href: '/dashboard/collected-students',
        roles: ['TEACHER'],
      },
      {
        label: 'Admissions',
        href: '/dashboard/admissions',
        roles: administrators,
      },
      {
        label: 'Home visits',
        href: '/dashboard/home-visits',
        roles: [...administrators, 'TEACHER'],
      },
      {
        label: 'Admission summary',
        href: '/dashboard/admission-summary',
        roles: [...administrators, 'TEACHER'],
      },
    ],
  },
  {
    label: 'Attendance',
    items: [
      {
        label: 'All users attendance',
        href: '/dashboard/attendance/users',
        roles: administrators,
      },
      {
        label: 'Student attendance',
        href: '/dashboard/attendance/students',
        roles: administrators,
      },
      {
        label: 'Teacher attendance',
        href: '/dashboard/attendance/teachers',
        roles: administrators,
      },
      {
        label: 'Admin attendance',
        href: '/dashboard/attendance/admins',
        roles: ['SUPER_ADMIN'],
      },
      {
        label: 'Super admin attendance',
        href: '/dashboard/attendance/super-admins',
        roles: ['SUPER_ADMIN'],
      },
      {
        label: 'Accountant attendance',
        href: '/dashboard/attendance/accountants',
        roles: administrators,
      },
      {
        label: 'Staff attendance',
        href: '/dashboard/attendance/staff',
        roles: administrators,
      },
      {
        label: 'Attendance reports',
        href: '/dashboard/attendance/reports',
        roles: administrators,
      },
      {
        label: 'My attendance',
        href: '/dashboard/attendance/me',
        roles: allRoles,
      },
    ],
  },
  {
    label: 'Leave Management',
    items: [
      {
        label: 'Apply for Leave',
        href: '/dashboard/leave/apply',
        roles: allRoles,
      },
      {
        label: 'My Applications',
        href: '/dashboard/leave/my-applications',
        roles: allRoles,
      },
      {
        label: 'Pending Approvals',
        href: '/dashboard/leave/pending',
        roles: administrators,
      },
      {
        label: 'All Applications',
        href: '/dashboard/leave/applications',
        roles: administrators,
      },
      {
        label: 'Leave History',
        href: '/dashboard/leave/history',
        roles: administrators,
      },
    ],
  },
  {
    label: 'Academic',
    items: [
      { label: 'Classes', href: '/dashboard/classes', roles: administrators },
      { label: 'Sections', href: '/dashboard/sections', roles: administrators },
      {
        label: 'My academic info',
        href: '/dashboard/academic-info',
        roles: ['STUDENT'],
      },
      {
        label: 'Admit cards',
        href: '/dashboard/admit-cards',
        roles: academicRoles,
      },
      { label: 'ID cards', href: '/dashboard/id-cards', roles: allRoles },
    ],
  },
  {
    label: 'Accounts',
    items: [
      {
        label: 'Accounts overview',
        href: '/dashboard/accounts/overview',
        roles: financeRoles,
      },
      {
        label: 'Fee settings',
        href: '/dashboard/accounts/fee-settings',
        roles: financeRoles,
      },
      {
        label: 'Collect payment',
        href: '/dashboard/accounts/collect-payment',
        roles: financeRoles,
      },
      {
        label: 'Invoices',
        href: '/dashboard/accounts/invoices',
        roles: financeRoles,
      },
      {
        label: 'Receipts',
        href: '/dashboard/accounts/receipts',
        roles: financeRoles,
      },
      {
        label: 'Payment history',
        href: '/dashboard/accounts/payments',
        roles: financeRoles,
      },
      {
        label: 'Dues and arrears',
        href: '/dashboard/accounts/dues',
        roles: financeRoles,
      },
      {
        label: 'Fee waivers',
        href: '/dashboard/accounts/waivers',
        roles: financeRoles,
      },
      {
        label: 'Refunds',
        href: '/dashboard/accounts/refunds',
        roles: financeRoles,
      },
      {
        label: 'Salary payments',
        href: '/dashboard/accounts/payroll',
        roles: financeRoles,
      },
      {
        label: 'Salary advances',
        href: '/dashboard/accounts/salary-advances',
        roles: financeRoles,
      },
      {
        label: 'Expenses',
        href: '/dashboard/accounts/expenses',
        roles: financeRoles,
      },
      {
        label: 'Other income',
        href: '/dashboard/accounts/income',
        roles: financeRoles,
      },
      {
        label: 'Cash and bank transactions',
        href: '/dashboard/accounts/transactions',
        roles: financeRoles,
      },
      {
        label: 'Financial reports',
        href: '/dashboard/accounts/reports',
        roles: financeRoles,
      },
      {
        label: 'Payment methods',
        href: '/dashboard/accounts/payment-methods',
        roles: administrators,
      },
      {
        label: 'My invoices',
        href: '/dashboard/accounts/my-invoices',
        roles: ['STUDENT'],
      },
      {
        label: 'My payments',
        href: '/dashboard/accounts/my-payments',
        roles: ['STUDENT'],
      },
      {
        label: 'My receipts',
        href: '/dashboard/accounts/my-receipts',
        roles: ['STUDENT'],
      },
      {
        label: 'My dues',
        href: '/dashboard/accounts/my-dues',
        roles: ['STUDENT'],
      },
      {
        label: 'My payslips',
        href: '/dashboard/accounts/my-payslips',
        roles: employeeRoles,
      },
    ],
  },
];
export const getDashboardNavigation = (role: UserRole) =>
  dashboardNavigation.filter((item) => item.roles.includes(role));
export const getDashboardGroups = (role: UserRole) =>
  groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);
export const isNavigationActive = (pathname: string, href: string) =>
  href === '/dashboard'
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/');
export const roleLabel = (role: UserRole) =>
  role.replaceAll('_', ' ').toLowerCase();
