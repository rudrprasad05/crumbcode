"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user == null) {
      toast.error("Login first");
      router.push(
        `/auth/login?page=contact&state=${formData.name}+${formData.email}+${formData.message}`
      );
      return;
    }

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-2 items-start text-sm">
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter first name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-gray-200 bg-rose-50"
        />
      </div>

      <div className="flex flex-col gap-2 items-start text-sm">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Enter contact email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-gray-200 bg-rose-50"
        />
      </div>
      <div className="flex flex-col gap-2 items-start text-sm">
        <Label>Message</Label>
        <Textarea
          name="message"
          placeholder="Enter Cake Details"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border-gray-200 bg-rose-50 min-h-[120px]"
        />
      </div>
      <Button
        type="submit"
        className="text-white bg-rose-600 hover:bg-rose-700"
      >
        Submit
      </Button>
    </form>
  );
}
