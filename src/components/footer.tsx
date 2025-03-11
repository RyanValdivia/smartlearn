//TODO config images
//TODO marketing links
//TODO social media links

import { COMPANY_NAME } from "@/core/constants";

//TODO contact links
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white rounded-lg shadow-sm  m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="idk"
                        className="flex flex-col mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        {/* <img
                            src="https://logosbynick.com/wp-content/uploads/2018/03/final-logo-example.png"
                            className="w-64"
                            alt="Your logo here"
                        /> */}
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                            {COMPANY_NAME}
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center ">
                    © {year + " "}
                    SprintCode™
                    <p>Si deseas una app como esta, contactanos en </p>
                    <a
                        href="https://link to portfolopio"
                        className="hover:underline"
                    >
                        SprintCode
                    </a>
                </span>
            </div>
        </footer>
    );
}
