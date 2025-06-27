import z from "zod";

export const SignInForm = z.object({
  username: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
});

export const RegisterForm = z.object({
  username: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  email: z
    .string()
    .email()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
});

export const NewMediaFormSchema = z.object({
  altText: z.string().min(1, "Alt text is required"),
  fileName: z.string().min(1, "File name is required"),
  file: z
    .custom<File>((val) => val instanceof File, "A file is required")
    .refine((file) => file.size > 0, "File cannot be empty"),
});

export type NewMediaFormType = z.infer<typeof NewMediaFormSchema>;
export type SignInFormType = z.infer<typeof SignInForm>;
export type RegisterFormType = z.infer<typeof RegisterForm>;
