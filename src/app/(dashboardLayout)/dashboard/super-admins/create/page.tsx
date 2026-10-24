import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateSuperAdminPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="SUPER_ADMIN" title="Add New Super Admin" />
    </div>
  );
}
