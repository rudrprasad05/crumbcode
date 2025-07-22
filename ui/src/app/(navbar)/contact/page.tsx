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

export default function ContactPage() {
  return (
    <main className="px-24 py-12 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <Label>
          Drop us a quick message and we'll be in touch within 24 hours
        </Label>
      </div>
      <ContactForm />
    </main>
  );
}
