import { User } from "@/src/entities/models/user/user";

export interface IAuthService {
    signIn(input: User) : boolean; 
}