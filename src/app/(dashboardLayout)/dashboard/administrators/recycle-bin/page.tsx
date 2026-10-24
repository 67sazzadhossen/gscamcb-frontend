import UserList from '@/components/Users/UserList';

export default function AdministratorsRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList
        role="ADMIN"
        title="Administrators Recycle Bin"
        isRecycleBin={true}
      />
    </div>
  );
}
