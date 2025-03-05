import { type CreateUser, type User } from "@/core/components/user/schemas/user";

export interface IAuthService {
    signIn(input: CreateUser): Promise<User>
}
