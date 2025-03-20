import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodInferSchema } from "../types";
import { type CreateUser, type LogIn } from "./types";
import { UserRole } from "@prisma/client";

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

export const logInSchema = z.object<ZodInferSchema<LogIn>>({
    dni: z.string().min(1, { message: "Ingresa tu DNI" }),
    password: z.string().min(1, { message: "Ingresa tu contraseña" }),
});

export const createUserFormSchema = z.object<ZodInferSchema<CreateUser>>({
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
        .nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    role: z.nativeEnum(UserRole),
});

export type CreateUserForm = z.infer<typeof createUserFormSchema>;

export function useCreateUserForm() {
    const form = useForm<CreateUserForm>({
        defaultValues: {
            dni: "",
            name: "",
            password: "",
            email: "",
            image: "",
            role: UserRole.STUDENT,
        },
        resolver: zodResolver(createUserFormSchema),
    });
    return { form };
}
