import { type Session } from "@/core/api/sessions/types";
import { type GetByTokenSessionParams } from "../../../api/sessions/types";

export interface ISessionsService {
    findByToken(params: GetByTokenSessionParams): Promise<Session | null>;
}
