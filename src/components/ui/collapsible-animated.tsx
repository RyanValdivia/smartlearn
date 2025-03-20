import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion, type MotionProps } from "motion/react";
import { createContext, useContext, useState } from "react";
import { useSidebar } from "./sidebar";

type CollapsibleContextType = {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
};

export const CollapsibleContext = createContext<CollapsibleContextType>({
    expanded: false,
    setExpanded: () => {},
});

export const CollapsibleAnimated = ({
    children,
    ...props
}: React.RefAttributes<HTMLDivElement> & MotionProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <CollapsibleContext.Provider value={{ expanded, setExpanded }}>
            <motion.div {...props}>{children}</motion.div>
        </CollapsibleContext.Provider>
    );
};

export const CollapsibleTriggerAnimated = ({
    children,
    ...props
}: React.RefAttributes<HTMLDivElement> &
    MotionProps & {
        asChild?: boolean;
    }) => {
    const { expanded, setExpanded } = useCollapsibleContext();
    const Comp = props.asChild ? Slot : "header";
    const MotionComp = motion.create(Comp);
    const { state } = useSidebar();

    return (
        <MotionComp
            animate={{ rotate: expanded ? -270 : 360 }}
            transition={{ type: "spring" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            hidden={state === "collapsed"}
            onClick={() => setExpanded(!expanded)}
        >
            {children}
        </MotionComp>
    );
};

export const CollapsibleContentAnimated = ({
    children,
    ...props
}: React.RefAttributes<HTMLDivElement> & MotionProps) => {
    const { expanded } = useCollapsibleContext();

    return (
        <AnimatePresence>
            {expanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export function useCollapsibleContext() {
    const values = useContext(CollapsibleContext);

    return values;
}
