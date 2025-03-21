import { type Account } from "@prisma/client";
import { type Jsonify } from "type-fest";

export type AccountFromAPI = Omit<
    Jsonify<Account>,
    "userId" | "createdAt" | "updatedAt"
>;

export type CreateAccount = Omit<Account, "createdAt" | "updatedAt">;

export type RegisterAccount = Omit<CreateAccount, "userId">;
