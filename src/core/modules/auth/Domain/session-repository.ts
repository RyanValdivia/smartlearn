import {
    type GetByTokenSessionParams,
    type Session,
} from "@/core/api/sessions/types";

export interface ISessionsRepository {
    findByToken(params: GetByTokenSessionParams): Promise<Session | null>;
}
