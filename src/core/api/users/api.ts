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
        const rest = await this._client.getMany({
            headers: {
                "content-type": "application/json",
            },
            query: params.filters,
        });

        if (rest.status === 200) {
            return rest.body;
        }

        throw new APIError(
            (rest.body as APIPaginationResponse<undefined>).message,
        );
    }
}
