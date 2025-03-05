"use client";
import { FooterSVGAnimated } from "@/components/footer-svg-animated";
import SignInForm from "@/components/sign-in";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { data: session } = useSession();

    if (!!session) return redirect("/dashboard");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignInForm />
            <FooterSVGAnimated />
        </div>
    );
}
