import UserList from '@/components/Users/UserList';

export default function TeachersRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList
        role="TEACHER"
        title="Teachers Recycle Bin"
        isRecycleBin={true}
      />
    </div>
  );
}
