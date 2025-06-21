import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, FileText, Star } from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Users",
    value: "856",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Blog Posts",
    value: "42",
    change: "+3",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Reviews",
    value: "4.8",
    change: "+0.2",
    changeType: "positive" as const,
    icon: Star,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
