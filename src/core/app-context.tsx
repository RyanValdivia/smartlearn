import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { ROUTES } from "./routes";
import { UserRole } from "@@/drizzle/schemas/auth";
import {
    type SessionRole,
    SessionRoles,
    type UpdateSessionPayload,
    UpdateSessionType,
} from "./server/auth/types";
import { toast } from "sonner";
import { useEventListener, useLocalStorage } from "usehooks-ts";
export type AppContextType = {
    selectedCycleId: number | null;
    selectCycle: (id: number) => Promise<void>;
    //TODO - Fix this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cycles: any;
    cyclesAreLoading: boolean;
    selectRole: (role: UserRole) => Promise<void>;
    selectedRole: SessionRole;
};

const AppContext = React.createContext<AppContextType>({
    selectedCycleId: null,
    selectCycle: async () => {},
    cycles: null,
    cyclesAreLoading: false,
    selectRole: async () => {},
    selectedRole: SessionRoles[UserRole.STUDENT],
});

export const AppProvider = React.memo(
    ({ children }: React.PropsWithChildren) => {
        const router = useRouter();

        const [, setRedirect, removeRedirect] = useLocalStorage("redirect", "");

        const { data: session, status, update } = useSession();

        // const { data, isPending: periodosAreLoading } = useCycles({
        //     variables: {
        //         estado: true,
        //     },
        // });
        //TODO - Fix this

        async function selectCycle(cycleId: number) {
            const _newSession = await update({
                type: UpdateSessionType.CYCLE,
                cycleId,
            } satisfies UpdateSessionPayload);

            setRedirect(ROUTES.dashboard.url);
            router.push(ROUTES.dashboard.url);
            router.refresh();
        }

        async function selectRole(role: UserRole) {
            const _newSession = await update({
                type: UpdateSessionType.ACCESS,
                access: role,
            });
            router.refresh();
        }

        const selectedRole = React.useMemo(() => {
            return SessionRoles[session?.own.sessionRole ?? UserRole.STUDENT];
        }, [session]);

        React.useEffect(() => {
            if (status === "unauthenticated") {
                router.push(ROUTES.login);
            }
        }, [status, router]);

        React.useEffect(() => {
            if (session?.error) {
                toast.error("Error al iniciar sesión");
            }
        }, [session?.error]);

        useEventListener("storage", (e) => {
            if (e.key === "redirect" && e.newValue) {
                router.push(JSON.parse(e.newValue));
                removeRedirect();
            }
        });

        return (
            <AppContext.Provider
                value={{
                    selectedCycleId: session?.own.cycleId ?? null,
                    selectCycle,
                    cycles: null,
                    cyclesAreLoading: false,
                    selectRole,
                    selectedRole,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    },
    (prev, next) => prev.children === next.children,
);

AppProvider.displayName = "AppProvider";

export function useAppContext() {
    const values = React.useContext(AppContext);

    return values;
}
