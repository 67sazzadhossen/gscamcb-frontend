import UserList from '@/components/Users/UserList';

export default function StudentsRecycleBinPage() {
  return (
    <div className="py-4">
      <UserList
        role="STUDENT"
        title="Students Recycle Bin"
        isRecycleBin={true}
      />
    </div>
  );
}
