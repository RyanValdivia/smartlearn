import { APIError, type APIPaginationResponse } from "..";
import { APIAccessor, type APIAccessorParams } from "../types";
import { userRouter } from "./schemas";
import { type UserAPI, type GetManyUsersParams, type User } from "./types";

export class UserClass
    extends APIAccessor<typeof userRouter>
    implements UserAPI
{
    constructor(params: APIAccessorParams) {
        super({ ...params, router: userRouter });
    }

    async getMany(
        params: GetManyUsersParams,
    ): Promise<APIPaginationResponse<User[]>> {
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
