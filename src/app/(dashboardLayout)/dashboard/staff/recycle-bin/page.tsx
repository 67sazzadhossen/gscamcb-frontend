import UserList from '@/components/Users/UserList';

export default function StaffRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList role="STAFF" title="Staff Recycle Bin" isRecycleBin={true} />
    </div>
  );
}
