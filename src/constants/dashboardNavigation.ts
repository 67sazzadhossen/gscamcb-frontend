import type { TUser } from '@/types/index.type';
export type UserRole = TUser['role'];
type NavigationItem = {
  label: string;
  href: string;
  roles: UserRole[];
  available?: boolean;
};
const allRoles: UserRole[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'TEACHER',
  'STUDENT',
  'ACCOUNTANT',
  'STAFF',
];
const administrators: UserRole[] = ['SUPER_ADMIN', 'ADMIN'];
export const dashboardNavigation: NavigationItem[] = [
  { label: 'Overview', href: '/dashboard', roles: allRoles, available: true },
  {
    label: 'My profile',
    href: '/dashboard/profile',
    roles: allRoles,
    available: true,
  },
  {
    label: 'Administrators',
    href: '/dashboard/administrators',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Users & employees',
    href: '/dashboard/users',
    roles: administrators,
  },
  {
    label: 'Students & admissions',
    href: '/dashboard/students',
    roles: administrators,
  },
  {
    label: 'Classes & sections',
    href: '/dashboard/classes',
    roles: administrators,
  },
  {
    label: 'Collected students',
    href: '/dashboard/collected-students',
    roles: ['TEACHER'],
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
  {
    label: 'Student fees',
    href: '/dashboard/fees',
    roles: [...administrators, 'ACCOUNTANT'],
  },
  {
    label: 'Fee waivers',
    href: '/dashboard/waivers',
    roles: [...administrators, 'ACCOUNTANT'],
  },
  {
    label: 'My academic info',
    href: '/dashboard/academic-info',
    roles: ['STUDENT'],
  },
  {
    label: 'Recycle bin',
    href: '/dashboard/recycle-bin',
    roles: administrators,
  },
];
export const getDashboardNavigation = (role: UserRole) =>
  dashboardNavigation.filter((item) => item.roles.includes(role));
export const roleLabel = (role: UserRole) =>
  role.replaceAll('_', ' ').toLowerCase();
