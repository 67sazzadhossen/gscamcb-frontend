import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateAdministratorPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="ADMIN" title="Add New Administrator" />
    </div>
  );
}
