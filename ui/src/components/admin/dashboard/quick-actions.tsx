import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Star, MessageSquare } from "lucide-react";

const actions = [
  {
    title: "New Post",
    description: "Create a new blog post",
    icon: FileText,
    href: "/admin/cakes/new",
  },
  {
    title: "Add Product",
    description: "Add a new cake to menu",
    icon: Plus,
    href: "/admin/products/new",
  },
  {
    title: "View Reviews",
    description: "Manage customer reviews",
    icon: Star,
    href: "/admin/reviews",
  },
  {
    title: "Messages",
    description: "Check customer messages",
    icon: MessageSquare,
    href: "/admin/messages",
  },
];

export function QuickActions() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-rose-50 hover:border-rose-200"
            >
              <action.icon className="h-5 w-5 text-rose-600" />
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  {action.title}
                </div>
                <div className="text-xs text-gray-500">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
