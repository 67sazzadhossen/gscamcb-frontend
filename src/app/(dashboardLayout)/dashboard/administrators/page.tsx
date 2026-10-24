import UserList from '@/components/Users/UserList';

export default function AdministratorsPage() {
  return (
    <div className="py-4">
      <UserList
        role="ADMIN"
        title="All Administrators"
        createHref="/dashboard/administrators/create"
      />
    </div>
  );
}
