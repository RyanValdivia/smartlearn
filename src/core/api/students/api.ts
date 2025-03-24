import { APIError, type APIResponse, type APIPaginationResponse } from "..";
import { APIAccessor, type APIAccessorParams } from "../types";
import { studentRouter } from "./schemas";
import {
    type CreateStudent,
    type StudentFromAPI,
    type StudentAPI,
} from "./types";

export class StudentClass
    extends APIAccessor<typeof studentRouter>
    implements StudentAPI
{
    constructor(params: APIAccessorParams) {
        super({ ...params, router: studentRouter });
    }
    async create(params: CreateStudent): Promise<APIResponse<StudentFromAPI>> {
        const res = await this._client.create({
            headers: {
                "content-type": "application/json",
            },
            body: params,
        });

        if (res.status === 201) {
            return res.body;
        }

        throw new APIError(
            (res.body as APIPaginationResponse<undefined>).message,
        );
    }
}
