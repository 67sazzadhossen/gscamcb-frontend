import UserList from '@/components/Users/UserList';

export default function TeachersPage() {
  return (
    <div className="py-4">
      <UserList
        role="TEACHER"
        title="All Teachers"
        createHref="/dashboard/teachers/create"
      />
    </div>
  );
}
