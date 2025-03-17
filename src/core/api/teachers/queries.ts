import { createQuery } from "react-query-kit";
import { API } from "../api-client";
import { type GetManyTeachersParams } from "./types";

const KEY = ["teachers"] as const;

export const useTeachers = createQuery({
    queryKey: KEY,
    fetcher: (params: GetManyTeachersParams) => {
        return API.teachers.getMany(params);
    },
});
