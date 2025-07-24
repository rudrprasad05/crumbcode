"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import ContactForm from "@/components/home/contact-form";
import { GetAllSocialMediaSite } from "@/actions/Site";
import { SocialMedia, MetaData } from "@/types";
import SocialCard from "@/components/home/SocialCard";

export default function ContactPage() {
  const [socialIcons, setSocialIcons] = useState<SocialMedia[]>([]);
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

      setSocialIcons(data.data as SocialMedia[]);
      setPagination((prev) => ({
        ...prev,
        totalCount: data.meta?.totalCount as number,
        totalPages: Math.ceil(
          (data.meta?.totalCount as number) / pagination.pageSize
        ),
      }));
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
