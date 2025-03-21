import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionRoles } from "@/core/server/auth/types";
import { type UserRole } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export type UserTableItem = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    dni: number;
    imagen: string | null;
};
const helper = createColumnHelper<UserTableItem>();

export const columns = [
    helper.accessor("id", {}),
    helper.accessor("name", {
        header: "Nombre",
    }),
    helper.accessor("email", {
        header: "Correo",
    }),
    helper.accessor("role", {
        header: "Rol",
        cell: ({ getValue }) => {
            const value = getValue() as UserTableItem["role"];
            const role = SessionRoles[value].label;
            return role;
        },
    }),
    helper.accessor("dni", {
        header: "DNI",
    }),
    helper.accessor("imagen", {
        header: "Imagen",
        cell: ({ getValue, row }) => {
            const userName = row.getValue("name") as UserTableItem["name"];
            const value = getValue() as UserTableItem["imagen"];
            if (!value) return <></>;
            return (
                <Avatar>
                    <AvatarImage src={value} alt={"No disponible"} />
                    <AvatarFallback className="rounded-lg">
                        {userName.split(" ")[0][0] + userName.split(" ")[1][0]}
                    </AvatarFallback>
                </Avatar>
            );
        },
    }),
];
