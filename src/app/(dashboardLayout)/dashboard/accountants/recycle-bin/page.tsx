import UserList from '@/components/Users/UserList';

export default function AccountantsRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList
        role="ACCOUNTANT"
        title="Accountants Recycle Bin"
        isRecycleBin={true}
      />
    </div>
  );
}
