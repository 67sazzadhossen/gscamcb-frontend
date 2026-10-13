export type TUser = {
  id: string;
  userId: string;
  email: string | null;
  role:
    'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ACCOUNTANT' | 'STAFF';
  mustChangePassword: boolean;
  profile: {
    image?: { displayUrl: string; publicId: string } | null;
    name: { firstName: string; middleName?: string | null; lastName: string };
  } | null;
};
export type TResponse<T> = { success: boolean; message: string; data: T };
export type THealth = { status: 'ok'; service: string; uptime: number };
