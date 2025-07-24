import { parseSocialLink } from "@/lib/link-parse";
import { SocialMedia } from "@/types";
import Link from "next/link";
import { useState, useEffect, SVGProps, FC } from "react";
import { Default, SocialIcons } from "../svg/icons";
import { Card, CardContent } from "../ui/card";

type IconType = FC<SVGProps<SVGSVGElement>>;

export default function SocialCard({ data }: { data: SocialMedia }) {
  const [username, setUsername] = useState<string>("");
  const [Icon, setIcon] = useState<IconType>(() => Default);

  useEffect(() => {
    setUsername(parseSocialLink(data.url as string).username as string);
  }, [data.url]);

  useEffect(() => {
    const foundIcon = SocialIcons.find(
      (icon) => icon.name.toLowerCase() === data?.icon?.toLowerCase()
    )?.Icon;

    setIcon(() => foundIcon || Default);
  }, [data.icon]);

  return (
    <Link href={data.url} className="">
      <Card
        className={`grow w-full max-w-sm transition-colors cursor-pointer border-0 shadow-sm hover:shadow-md`}
      >
        <CardContent className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full bg-white shadow-sm`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {data.name}
              </p>
              <p className="text-sm text-gray-500 truncate">@{username}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
