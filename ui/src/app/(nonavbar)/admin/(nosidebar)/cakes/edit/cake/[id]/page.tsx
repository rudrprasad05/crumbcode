"use client";

import { GetOneCake } from "@/actions/Cake";
import CakeEditor from "@/components/admin/posts/create/cake/CakeEditor";
import { Cake } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [cake, setCake] = useState<Cake | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      const cake = await GetOneCake(params.id);
      setCake(cake);

      setLoading(false);
    };
    getData();
  }, [params]);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!cake) {
    return <>Invalid URL</>;
  }

  return <CakeEditor cake={cake} />;
}
