import z from 'zod';

export const SignInForm = z.object({
    username: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
    password: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
});

export const RegisterForm = z.object({
    username: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
    email: z
        .string()
        .email()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
    password: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
});

export const NewFolderForm = z.object({
    name: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
});
export const MoveFolderForm = z.object({
    id: z.string(),
});

export const NewFolderWithParentForm = z.object({
    name: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
    parentId: z.string(),
});

export const RenameMediaForm = z.object({
    name: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
});

export type SignInFormType = z.infer<typeof SignInForm>;
export type RegisterFormType = z.infer<typeof RegisterForm>;
export type NewFolderType = z.infer<typeof NewFolderForm>;
export type NewFolderWithParentType = z.infer<typeof NewFolderWithParentForm>;
export type RenameMediaFormType = z.infer<typeof RenameMediaForm>;
export type MoveFolderFormType = z.infer<typeof MoveFolderForm>;
