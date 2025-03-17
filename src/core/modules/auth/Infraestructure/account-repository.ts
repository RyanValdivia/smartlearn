import {
    type CreateAccount,
    type AccountFromAPI,
} from "@/core/api/accounts/account";
import { type IAccountsRepository } from "../Domain/account-repository";
import { jsonify } from "@/lib/utils";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
import { type PrismaClient } from "@prisma/client";
@injectable()
export class AccountsRepository implements IAccountsRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}
    async createAccount(input: CreateAccount): Promise<AccountFromAPI> {
        const account = await this._client.account.create({
            data: input,
        });

        return jsonify(account);
    }

    async findAccountByUserId(userId: string): Promise<AccountFromAPI | null> {
        const account = await this._client.account.findMany({
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
