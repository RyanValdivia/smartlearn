import { APIError, type APIPaginationResponse } from "..";
import { APIAccessor, type APIAccessorParams } from "../types";
import { teacherRouter } from "./schemas";
import {
    type TeacherFromAPI,
    type GetManyTeachersParams,
    type TeacherAPI,
} from "./types";

export class TeacherClass
    extends APIAccessor<typeof teacherRouter>
    implements TeacherAPI
{
    constructor(params: APIAccessorParams) {
        super({ ...params, router: teacherRouter });
    }

    async getMany(
        params: GetManyTeachersParams,
    ): Promise<APIPaginationResponse<TeacherFromAPI[]>> {
        const res = await this._client.getMany({
            headers: {
                "content-type": "application/json",
            },
            query: params.filters,
        });

        if (res.status === 200) {
            return res.body;
        }

        throw new APIError(
            (res.body as APIPaginationResponse<undefined>).message,
        );
    }
}
