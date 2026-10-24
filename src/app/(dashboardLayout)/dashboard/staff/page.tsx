import UserList from '@/components/Users/UserList';

export default function StaffPage() {
  return (
    <div className="py-4">
      <UserList
        role="STAFF"
        title="All Staff Members"
        createHref="/dashboard/staff/create"
      />
    </div>
  );
}
