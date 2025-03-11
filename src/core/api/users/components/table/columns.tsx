import { createColumnHelper } from "@tanstack/react-table";

export type UserTableItem = {
    id: string;
    name: string;
    email: string;
    role: string;
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
    }),
];
