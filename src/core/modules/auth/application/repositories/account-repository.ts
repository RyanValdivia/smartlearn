import {
    type Account,
    type CreateAccount,
} from "../../entities/models/account";

export interface IAccountsRepository {
    createAccount(input: CreateAccount): Promise<Account>;
    findAccountByUserId(userId: string): Promise<Account | null>;
}
