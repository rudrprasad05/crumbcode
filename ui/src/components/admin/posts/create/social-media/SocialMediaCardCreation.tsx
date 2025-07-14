"use client";

import { Default, SocialIcons } from "@/components/svg/icons";
import { Card, CardContent } from "@/components/ui/card";
import { useSocialMedia } from "@/context/SocialMediaContext";
import { parseSocialLink } from "@/lib/link-parse";
import { SocialMedia } from "@/types";
import Link from "next/link";
import { FC, SVGProps, useEffect, useState } from "react";

type IconType = FC<SVGProps<SVGSVGElement>>;

export default function SocialMediaCardCreation({
  data,
}: {
  data: SocialMedia;
}) {
  const [username, setUsername] = useState<string>("");
  const [Icon, setIcon] = useState<IconType>(() => Default);
  const { socialMedia, setInitialCakeState } = useSocialMedia();

  useEffect(() => {
    if (data) {
      setInitialCakeState(data);
    }
  }, [data]);

  useEffect(() => {
    setUsername(parseSocialLink(socialMedia.url as string).username as string);
  }, [socialMedia.url]);

  useEffect(() => {
    const foundIcon = SocialIcons.find(
      (icon) => icon.name.toLowerCase() === socialMedia?.icon?.toLowerCase()
    )?.Icon;

    setIcon(() => foundIcon || Default);
  }, [socialMedia.icon]);

  return (
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
              {socialMedia.name}
            </p>
            <p className="text-sm text-gray-500 truncate">@{username}</p>
          </div>
        </div>
        <div className="text-end text-sm flex flex-col">
          <Link
            className="underline-offset-4 hover:underline"
            href={"/admin/socials/edit/" + socialMedia.uuid}
          >
            Edit
          </Link>
          <Link
            className="underline-offset-4 hover:underline"
            href={"//" + socialMedia.url}
          >
            Open
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
