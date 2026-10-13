import type { TUser } from '@/types/index.type';
export function getUserName(user: TUser) {
  const name = user.profile?.name;
  return name
    ? [name.firstName, name.middleName, name.lastName].filter(Boolean).join(' ')
    : user.userId;
}
