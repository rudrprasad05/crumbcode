"use client";

import { GetAllSocialMedia } from "@/actions/SocialMedia";
import { Default, SocialIcons } from "@/components/svg/icons";
import { Card, CardContent } from "@/components/ui/card";
import { parseSocialLink } from "@/lib/link-parse";
import { MetaData, SocialMedia } from "@/types";
import Link from "next/link";
import { FC, SVGProps, useEffect, useState } from "react";
import ContactForm from "./contact-form";
import { GetAllSocialMediaSite } from "@/actions/Site";
type IconType = FC<SVGProps<SVGSVGElement>>;

export default function ContactSection() {
  const [socialIcons, setSocialIcons] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<MetaData>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 5,
    totalPages: 0,
  });

  useEffect(() => {
    setSocialIcons([]);
    const getData = async () => {
      const data = await GetAllSocialMediaSite({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
      });

      console.log(data);

      setSocialIcons(data.data as SocialMedia[]);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.meta?.totalCount as number,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));

      setLoading(false);
    };
    getData();
  }, [pagination.pageNumber, pagination.pageSize]);

  return (
    <section className="py-16 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-700 mt-2">Reach Out for a Custom Cake</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="">
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-4 flex flex-col">
              {socialIcons.map((i, index) => (
                <SocialCard key={index} data={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialCard({ data }: { data: SocialMedia }) {
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
