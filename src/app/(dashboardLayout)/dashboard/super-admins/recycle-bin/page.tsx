import UserList from '@/components/Users/UserList';

export default function SuperAdminsRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList
        role="SUPER_ADMIN"
        title="Super Admins Recycle Bin"
        isRecycleBin={true}
      />
    </div>
  );
}
