// import { APIError, type APIResponse } from "..";
// import { APIAccessor, type APIAccessorParams } from "../types";
// import {
//     type GetByTokenSessionParams,
//     type Session,
//     type SessionAPI,
// } from "./types";

// export class SessionClass
//     extends APIAccessor<typeof sessionRouter>
//     implements SessionAPI
// {
//     constructor(params: APIAccessorParams) {
//         super({ ...params, router: sessionRouter });
//     }
//     async getByToken(
//         params: GetByTokenSessionParams,
//     ): Promise<APIResponse<Session>> {
//         const rest = await this._client.getByToken({
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: params,
//         });

//         if (rest.status === 200) {
//             return rest.body;
//         }

//         throw new APIError((rest.body as APIResponse<undefined>).message);
//     }
// }
