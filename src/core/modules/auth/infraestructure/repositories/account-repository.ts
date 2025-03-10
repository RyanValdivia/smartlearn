import { db } from "@@/drizzle/client";
import { type IAccountsRepository } from "../../application/repositories/account-repository";
import {
    type CreateAccount,
    type Account,
} from "../../entities/models/account";
import { accountsTable } from "@@/drizzle/schemas/auth";
import { eq } from "drizzle-orm";

export class AccountsRepository implements IAccountsRepository {
    async createAccount(input: CreateAccount): Promise<Account> {
        console.log("input", input);
        const [account] = await db
            .insert(accountsTable)
            .values(input)
            .returning();

        return account;
    }

    async findAccountByUserId(userId: string): Promise<Account | null> {
        const [account] = await db
            .select()
            .from(accountsTable)
            .where(eq(accountsTable.userId, userId))
            .limit(1);

        return account;
    }
}
