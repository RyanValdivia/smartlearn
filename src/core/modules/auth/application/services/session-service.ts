import {
    type GetByTokenSessionParams,
    type Session,
} from "@/core/api/sessions/types";
import { type ISessionsRepository } from "../../Domain/session-repository";
import { type ISessionsService } from "../../Domain/session-service";

export class SessionsService implements ISessionsService {
    constructor(private readonly sessionsRepository: ISessionsRepository) {}

    findByToken(params: GetByTokenSessionParams): Promise<Session | null> {
        return this.sessionsRepository.findByToken({ token: params.token });
    }
}
