import { useForm } from "react-hook-form";
import { z } from "zod";
import { type CreateUserForm, type LogIn } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodInferSchema } from "../types";
import { UserRole } from "@@/drizzle/schemas/auth";

export function useLogInForm() {
    const form = useForm<LogIn>({
        defaultValues: {
            dni: "",
            password: "",
        },
        resolver: zodResolver(logInSchema),
    });

    return { form };
}

export const logInSchema = z.object({
    dni: z.string().length(8, { message: "El DNI debe tener 8 caracteres" }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(20, {
            message: "La contraseña debe tener como máximo 20 caracteres",
        })
        .refine((password) => /[A-Z]/.test(password), {
            message: "La contraseña debe tener al menos una mayúscula",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "La contraseña debe tener al menos una minúscula",
        })
        .refine((password) => /[0-9]/.test(password), {
            message: "La contraseña debe tener al menos un número",
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "La contraseña debe tener al menos un caracter especial",
        }),
});

export const createUserFormSchema = z.object<ZodInferSchema<CreateUserForm>>({
    dni: z.string().length(8, { message: "El DNI debe tener 8 caracteres" }),
    name: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .refine((val) => val.split(" ").length > 1, {
            message: "El nombre debe tener al menos un apellido",
        }),
    password: z
        .string()
        .length(8, { message: "El DNI debe tener 8 caracteres" })
        .nullable()
        .optional(),
    email: z.string().nullable().optional(),
    emailVerified: z.string().date().nullable().optional(),
    image: z.string().nullable().optional(),
    role: z.nativeEnum(UserRole).optional(),
});

export function useCreateUserForm() {
    const form = useForm<CreateUserForm>({
        defaultValues: {
            dni: "",
            name: "",
            password: "",
            email: "",
            emailVerified: "",
            image: "",
            role: UserRole.STUDENT,
        },
        resolver: zodResolver(createUserFormSchema),
    });
    return { form };
}
