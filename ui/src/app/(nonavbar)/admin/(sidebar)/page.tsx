import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      <DashboardStats />
    </div>
  );
}
