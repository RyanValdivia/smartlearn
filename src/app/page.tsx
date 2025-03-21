"use client";
import { FooterSVGAnimated } from "@/components/footer-svg-animated";
import SignInForm from "@/components/sign-in";
import { ROUTES } from "@/core/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { data: session } = useSession();
    if (session) return redirect(ROUTES.dashboard.url);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignInForm />
            <FooterSVGAnimated />
        </div>
    );
}
