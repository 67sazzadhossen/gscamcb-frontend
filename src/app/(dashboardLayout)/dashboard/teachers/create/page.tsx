import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateTeacherPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="TEACHER" title="Add New Teacher" />
    </div>
  );
}
