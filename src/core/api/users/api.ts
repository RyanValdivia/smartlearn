import { APIError, type APIResponse } from "..";
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

    async getMany(params: GetManyUsersParams): Promise<APIResponse<User[]>> {
        const rest = await this._client.getMany({
            headers: {
                "content-type": "application/json",
            },
            query: params.filters,
        });

        if (rest.status === 200) {
            return rest.body;
        }

        throw new APIError((rest.body as APIResponse<undefined>).message);
    }
}
