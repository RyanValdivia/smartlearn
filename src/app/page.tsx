"use client";
import { FooterSVGAnimated } from "@/components/footer-svg-animated";
import SignInForm from "@/components/sign-in";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <SignInForm />
            <FooterSVGAnimated />
        </div>
    );
}
