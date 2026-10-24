import UserList from '@/components/Users/UserList';

export default function StudentsPage() {
  return (
    <div className="py-4">
      <UserList
        role="STUDENT"
        title="All Students"
        createHref="/dashboard/students/create"
      />
    </div>
  );
}
