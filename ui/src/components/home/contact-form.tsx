"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactMessageTypes } from "@/types";

type FormData = {
  name: string;
  email: string;
  message: string;
  type: ContactMessageTypes;
};

export default function ContactForm() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let ls = localStorage.getItem("contact-form");
    if (!ls || ls.trim().length === 0) return;

    try {
      const parsed = JSON.parse(ls);

      const tmpFormdata: FormData = {
        name: parsed.name || "",
        email: parsed.email || "",
        message: parsed.message || "",
        type: parsed.type as ContactMessageTypes, // Convert string to enum
      };
      console.log(parsed.type, parsed.type as ContactMessageTypes);

      setFormData(tmpFormdata);
      //   localStorage.removeItem("contact-form");
    } catch (err) {
      console.error("Failed to parse form data from localStorage:", err);
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    type: ContactMessageTypes.INFO,
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
      localStorage.setItem("contact-form", JSON.stringify(formData));
      router.push(`/auth/login?redirect=contact`);
      return;
    }

    setFormData({
      name: "",
      email: "",
      message: "",
      type: ContactMessageTypes.INFO,
    });
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
          className="w-full border-gray-200 "
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
          className="w-full border-gray-200 "
        />
      </div>
      <div className="flex flex-col gap-2 items-start text-sm">
        <Label>Enquiry Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: ContactMessageTypes) =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="General Info" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ContactMessageTypes.INFO}>
              General Info
            </SelectItem>
            <SelectItem value={ContactMessageTypes.ORDER}>
              Cake Order
            </SelectItem>
            <SelectItem value={ContactMessageTypes.UPDATE}>
              Order Updates
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 items-start text-sm">
        <Label>Message</Label>
        <Textarea
          name="message"
          placeholder="Enter Cake Details"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border-gray-200  min-h-[120px]"
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
