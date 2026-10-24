import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateAccountantPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="ACCOUNTANT" title="Add New Accountant" />
    </div>
  );
}
