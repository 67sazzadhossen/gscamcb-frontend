import UserList from '@/components/Users/UserList';

export default function AccountantsPage() {
  return (
    <div className="py-4">
      <UserList
        role="ACCOUNTANT"
        title="All Accountants"
        createHref="/dashboard/accountants/create"
      />
    </div>
  );
}
