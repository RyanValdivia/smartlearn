import { type Account, type CreateAccount } from "../../../api/account";

export interface IAccountsRepository {
    createAccount(input: CreateAccount): Promise<Account>;
    findAccountByUserId(userId: string): Promise<Account | null>;
}
