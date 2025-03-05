import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const logInSchema = z.object({
    userIdentificator: z
        .string()
        .min(2, {
            message: "El identificador debe tener al menos 2 caracteres",
        })
        .max(50, {
            message: "El identificador debe tener menos de 50 caracteres",
        }),
    password: z
        .string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        })
        .max(50, {
            message: "La contraseña debe tener menos de 50 caracteres",
        }),
});
