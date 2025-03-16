import {
    type CreateAccount,
    type AccountFromAPI,
} from "@/core/api/accounts/account";
import { type IAccountsRepository } from "../Domain/account-repository";
import { db } from "@/core/server/db";
import { jsonify } from "@/lib/utils";

export class AccountsRepository implements IAccountsRepository {
    async createAccount(input: CreateAccount): Promise<AccountFromAPI> {
        const account = await db.account.create({
            data: input,
        });

        return jsonify(account);
    }

    async findAccountByUserId(userId: string): Promise<AccountFromAPI | null> {
        const account = await db.account.findMany({
            where: {
                userId,
            },
        });

        if (account.length === 0) {
            return null;
        }
        
        return jsonify(account[0]);
    }
}
