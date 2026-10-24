import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateStudentPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="STUDENT" title="Add New Student" />
    </div>
  );
}
