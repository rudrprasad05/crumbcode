"use client";

import { GetOneSocialMedia } from "@/actions/SocialMedia";
import SocialMediaEditor from "@/components/admin/posts/create/social-media/SocialMediaEditor";
import { LoadingContainer } from "@/components/global/LoadingContainer";
import {
  SocialMediaProvider,
  useSocialMedia,
} from "@/context/SocialMediaContext";
import { SocialMedia } from "@/types";
import React from "react";
import { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // important!
};

export default function SocialEditPage({ params }: PageProps) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SocialMedia | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const res = await GetOneSocialMedia(id);
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!data) {
    return <>Invalid URL</>;
  }

  return <SocialMediaEditor socialMedia={data} />;
}
