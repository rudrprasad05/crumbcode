"use client";

import { GetOneMedia } from "@/actions/Media";
import MediaEditor from "@/components/admin/posts/create/media/MediaEditor";
import { LoadingContainer } from "@/components/global/LoadingContainer";
import { Media } from "@/types";
import React, { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // important!
};

export default function EditMediaPage({ params }: PageProps) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState<Media | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const cake = await GetOneMedia(id);
      console.dir("media get", cake);
      setMedia(cake.data);
      setLoading(false);
    };
    getData();
  }, [params, id]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!media) {
    return <>Invalid URL</>;
  }

  return <MediaEditor media={media} />;
}
