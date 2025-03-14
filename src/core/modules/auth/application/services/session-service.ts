import { type Session } from "@/core/api/session";
import { type ISessionsRepository } from "../../Domain/session-repository";
import { type ISessionsService } from "../../Domain/session-service";

export class SessionsService implements ISessionsService {
    constructor(private readonly sessionsRepository: ISessionsRepository) {}

    findByToken(token: string): Promise<Session | null> {
        return this.sessionsRepository.findByToken(token);
    }
}
