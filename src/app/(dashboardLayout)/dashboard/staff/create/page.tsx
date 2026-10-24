import CreateUserForm from '@/components/Users/CreateUserForm';

export default function CreateStaffPage() {
  return (
    <div className="py-4">
      <CreateUserForm initialRole="STAFF" title="Add New Staff Member" />
    </div>
  );
}
