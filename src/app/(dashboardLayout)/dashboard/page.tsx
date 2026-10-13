import BackendStatus from '@/components/Dashboard/BackendStatus';
export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
      <p className="mt-3 text-slate-600">
        Welcome to your school management dashboard.
      </p>
      <BackendStatus />
    </>
  );
}
