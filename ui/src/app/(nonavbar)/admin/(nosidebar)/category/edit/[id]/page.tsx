"use client";

import { GetOneCake } from "@/actions/Cake";
import CakeEditor from "@/components/admin/posts/create/cake/CakeEditor";
import { Cake } from "@/types";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // important!
};

export default function EditCategoryPage({ params }: PageProps) {
  const [loading, setLoading] = useState(true);
  const [cake, setCake] = useState<Cake | undefined>(undefined);
  const { id } = React.use(params);

  useEffect(() => {
    const getData = async () => {
      const cake = await GetOneCake(id);
      setCake(cake);

      setLoading(false);
    };
    getData();
  }, [params, id]);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!cake) {
    return <>Invalid URL</>;
  }

  return <CakeEditor cake={cake} />;
}
