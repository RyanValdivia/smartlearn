import {
    Home,
    type LucideIcon,
    PieChart,
    ShieldUser,
    UserIcon,
} from "lucide-react";
//SEPARE URL BY MODULE
export const ROUTES = {
    home: {
        url: "/app",
        name: "Home",
        icon: Home,
    },
    dashboard: {
        url: "/app/dashboard",
        name: "Dashboard",
        icon: PieChart,
    },
    admin: {
        name: "Admin",
        url: "/app/admin",
        icon: ShieldUser,
        subRoutes: [
            {
                name: "Usuarios",
                url: "/app/admin/users",
                icon: UserIcon,
                subRoutes: [
                    { url: "/app/admin/users/students", name: "Estudiantes" },
                    {
                        url: "/app/admin/users/teachers",
                        name: "Profesores",
                    },
                    {
                        url: "/app/admin/users/admins",
                        name: "Administradores",
                    },
                ],
            },
        ],
    },
    login: "/",
};

export type Route = {
    url: string;
    name: string;
    icon?: LucideIcon;
    subRoutes?: Route[];
};
