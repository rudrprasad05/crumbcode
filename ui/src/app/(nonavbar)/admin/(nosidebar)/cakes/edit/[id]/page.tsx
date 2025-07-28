"use client";

import { GetOneCake } from "@/actions/Cake";
import CakeEditor from "@/components/admin/posts/create/cake/CakeEditor";
import { LoadingContainer } from "@/components/global/LoadingContainer";
import { Cake } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // important!
};

export default function EditCakePage({ params }: PageProps) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [cake, setCake] = useState<Cake | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const cake = await GetOneCake(id);
      setCake(cake.data);
      setLoading(false);
    };
    getData();
  }, [params, id]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!cake) {
    return <>Invalid URL</>;
  }

  return <CakeEditor cake={cake} />;
}
