import UserList from '@/components/Users/UserList';

export default function SuperAdminsPage() {
  return (
    <div className="py-4">
      <UserList
        role="SUPER_ADMIN"
        title="All Super Admins"
        createHref="/dashboard/super-admins/create"
      />
    </div>
  );
}
