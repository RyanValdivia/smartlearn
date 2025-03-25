import { APIError, type APIPaginationResponse } from "..";
import { APIAccessor, type APIAccessorParams } from "../types";
import { userRouter } from "./schemas";
import {
    type UserAPI,
    type GetManyUsersParams,
    type UserFromAPI,
} from "./types";

export class UserClass
    extends APIAccessor<typeof userRouter>
    implements UserAPI
{
    constructor(params: APIAccessorParams) {
        super({ ...params, router: userRouter });
    }

    async getMany(
        params: GetManyUsersParams,
    ): Promise<APIPaginationResponse<UserFromAPI[]>> {
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

    async getOne(id: string): Promise<UserFromAPI | null> {
        const res = await this._client.getOne({
            headers: {
                "content-type": "application/json",
            },
            params: { id },
        });

        if (res.status === 200) {
            return res.body;
        }

        throw new APIError("Error fetching user");
    }

    async edit(id: string, data: Partial<UserFromAPI>): Promise<UserFromAPI> {
        const res = await this._client.edit({
            headers: {
                "content-type": "application/json",
            },
            body: {
                data: {
                    ...data,
                },
                id,
            },
        });

        if (res.status === 200) {
            return res.body;
        }

        throw new APIError("Error updating user");
    }

    async delete(id: string): Promise<void> {
        const res = await this._client.delete({
            headers: {
                "content-type": "application/json",
            },
            query: { id: { id } },
        });

        if (res.status === 200) {
            return;
        }

        throw new APIError("Error deleting user");
    }
}
