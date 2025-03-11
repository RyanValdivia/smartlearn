"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { LogInForm } from "../core/api/users/components/form";

export default function SignInForm() {
    const handleGoogleLogin = async () => {
        await signIn("google");
    };

    return (
        <div className="flex items-center justify-center z-10 ">
            <div className="w-full space-y-5 p-8 bg-white rounded-xl shadow-2xl">
                <div className="text-center">
                    <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                        <svg
                            className="w-12 h-12 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        Bienvenido de nuevo
                    </h2>
                    <p className="text-gray-600">
                        Inicia sesión en tu cuenta para continuar
                    </p>
                </div>

                <LogInForm />

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        O
                    </span>
                </div>
                <Button
                    className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-semibold py-3 h-auto"
                    variant="outline"
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Continuar con Google
                </Button>

                <p className="text-xs text-center text-gray-500 mt-8">
                    Al iniciar sesión, aceptas nuestros{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        términos de servicio
                    </a>{" "}
                    y{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        política de privacidad
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
