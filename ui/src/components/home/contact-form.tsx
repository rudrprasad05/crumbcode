"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { optional, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ContactMessageTypes } from "@/types";
import { CreateMessage } from "@/actions/ContactMessage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(2, "Minumum Message of 2 characters is required"),
  type: z.nativeEnum(ContactMessageTypes),
  userId: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMessageSent, setIsMessageSent] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      type: ContactMessageTypes.INFO,
      userId: user?.id,
    },
  });

  useEffect(() => {
    const ls = localStorage.getItem("contact-form");
    if (!ls) return;

    try {
      const parsed = JSON.parse(ls);
      form.reset({
        name: parsed.name || "",
        email: parsed.email || "",
        message: parsed.message || "",
        type: parsed.type || ContactMessageTypes.INFO,
      });
    } catch (err) {
      console.error("Error parsing form data from localStorage", err);
    }
  }, [form]);

  const onSubmit = async (data: ContactFormValues) => {
    if (!user) {
      toast.error("Please login to continue");
      localStorage.setItem("contact-form", JSON.stringify(data));
      router.push(`/auth/login?redirect=contact`);
      return;
    }

    setIsMessageSent(true);

    try {
      data.userId = user.id;
      await CreateMessage(data);
      toast.success("Message Sent");
    } catch (error) {
      setIsMessageSent(false);
    }

    form.reset();
  };

  if (isMessageSent) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your message has been sent</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              We'll be in touch shortly. Please check your email inbox and spam
              folder
            </CardDescription>
            <CardDescription>
              You can also contact us through mobile on 999999
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enquiry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
