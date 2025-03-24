import { createMutation } from "react-query-kit";
import { type CreateStudent } from "./types";
import { API } from "../api-client";

export const useCreateStudent = createMutation({
    mutationFn: (data: CreateStudent) => {
        return API.students.create(data);
    },
});
