"use client";

import { useAuth } from "@/context/UserContext";
import ContactForm from "./contact-form";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { MetaData, SocialMedia } from "@/types";
import { useEffect, useState } from "react";
import { GetAllSocialMedia } from "@/actions/SocialMedia";
import { SocialMediaCard } from "../admin/socials/SocialSection";

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
      const data = await GetAllSocialMedia({
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="">
            <ContactForm />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {socialIcons.map((i) => (
                <SocialMediaCard data={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
