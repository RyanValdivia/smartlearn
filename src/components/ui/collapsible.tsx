// "use client";

// import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
// import { motion, MotionProps } from "motion/react";
// import { useEffect, useRef, useState } from "react";

// const Collapsible = CollapsiblePrimitive.Root;

// const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// function CollapsibleContent({
//     ...props
// }: CollapsiblePrimitive.CollapsibleContentProps &
//     React.RefAttributes<HTMLDivElement> &
//     MotionProps) {
//     const myRef = useRef<HTMLDivElement>(null);
//     const [dataState, setDataState] = useState<string | null>(null);

//     useEffect(() => {
//         const observer = new MutationObserver(() => {
//             if (myRef.current) {
//                 setDataState(myRef.current.getAttribute("data-state"));
//             }
//         });

//         if (myRef.current) {
//             observer.observe(myRef.current, {
//                 attributes: true,
//                 attributeFilter: ["data-state"],
//             });
//         }

//         return () => observer.disconnect();
//     }, []);

//     const CollapsibleContentAnimated = motion.create(
//         CollapsiblePrimitive.CollapsibleContent,
//     );

//     return (
//         <CollapsibleContentAnimated
//             ref={myRef}
//             {...props}
//             variants={{
//                 hidden: { opacity: 0 },
//             }}
//             hidden={dataState === "closed"}
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             layout
//         />
//     );
// }

// export { Collapsible, CollapsibleTrigger, CollapsibleContent };
