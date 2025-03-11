import { createQuery } from "react-query-kit";
import { type GetManyUsersParams } from "./types";
import { API } from "../api-client";

const KEY = ["users"] as const;

export const useUsers = createQuery({
    queryKey: KEY,
    fetcher: (params: GetManyUsersParams) => {
        return API.users.getMany(params);
    },
});
