import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type z } from "zod";
import { type logInSchema, useLogInForm } from "../../forms";
import { signIn } from "next-auth/react";

async function onSubmit(values: z.infer<typeof logInSchema>) {
    const x = await signIn("credentials", {
        username: values.dni,
        password: values.password,
    });
    console.log(x);
}

export function LogInForm() {
    const { form } = useLogInForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Escribe tu numero de identificación"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Escribe tu contraseña"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Iniciar sesión
                </Button>
            </form>
        </Form>
    );
}
