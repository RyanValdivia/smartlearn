import { Home, PieChart, ShieldUser } from "lucide-react";
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
        icon: ShieldUser,
        subRoutes: [
            {
                url: "/app/admin/users/students",
                name: "Estudiantes",
            },
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
    login: "/",
} as const;
