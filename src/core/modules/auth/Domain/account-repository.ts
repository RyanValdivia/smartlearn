import {
    type AccountFromAPI,
    type CreateAccount,
} from "../../../api/accounts/types";

export interface IAccountsRepository {
    createAccount(input: CreateAccount): Promise<AccountFromAPI>;

    findAccountByUserId(userId: string): Promise<AccountFromAPI | null>;
}
