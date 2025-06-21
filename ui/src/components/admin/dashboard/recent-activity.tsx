import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "Sarah Johnson",
    action: "placed a new order",
    time: "2 minutes ago",
    avatar: "SJ",
  },
  {
    user: "Mike Chen",
    action: "left a 5-star review",
    time: "15 minutes ago",
    avatar: "MC",
  },
  {
    user: "Emma Davis",
    action: "subscribed to newsletter",
    time: "1 hour ago",
    avatar: "ED",
  },
  {
    user: "John Smith",
    action: "contacted support",
    time: "2 hours ago",
    avatar: "JS",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={activity.user} />
                <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">{activity.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
