"use client";

import { GetDashboardData } from "@/actions/Dashboard";
import { SmallLoadingHorizontialCard } from "@/components/global/LoadingContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData } from "@/types";
import {
  Cake,
  Database,
  FileText,
  Loader2,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuickActions } from "./quick-actions";

const stats = [
  {
    title: "Total Cakes",
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
];

export function DashboardStats() {
  const [data, setdata] = useState<DashboardData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const data = await GetDashboardData();
      setdata(data.data);
      console.dir(data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Cakes
            </CardTitle>
            <Cake className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading && (
              <Loader2 className="text-2xl text-gray-900 animate-spin" />
            )}
            <div className="text-2xl font-bold text-gray-900">
              {data?.totalCakes}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Messages
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading && (
              <Loader2 className="text-2xl text-gray-900 animate-spin" />
            )}
            <div className="text-2xl font-bold text-gray-900">
              {data?.totalMessages}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Media
            </CardTitle>
            <Database className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading && (
              <Loader2 className="text-2xl text-gray-900 animate-spin" />
            )}
            <div className="text-2xl font-bold text-gray-900">
              {data?.totalMedia}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading && (
              <Loader2 className="text-2xl text-gray-900 animate-spin" />
            )}
            <div className="text-2xl font-bold text-gray-900">
              {data?.totalUsers}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 pb-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="space-y-4 grow h-full">
              {loading &&
                Array.from({ length: 4 }, (_, i) => (
                  <SmallLoadingHorizontialCard key={i} />
                ))}
              {data?.notifications.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={activity.user?.email}
                    />
                    <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">
                      US
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">
                        {activity.user?.email}
                      </span>
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFullDate(activity.createdOn)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t">
            <Link href="/admin/notifications">
              <Button variant="ghost" className="w-full justify-center text-sm">
                See All Notifications
              </Button>
            </Link>
          </div>
        </Card>
        <QuickActions />
      </div>
    </div>
  );
}

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
