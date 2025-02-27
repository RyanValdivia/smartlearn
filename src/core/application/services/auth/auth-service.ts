import { CreateUser, User } from "@/core/entities/models/user/user";

export interface IAuthService {
    signIn(input: CreateUser) : Promise<User>; 
}