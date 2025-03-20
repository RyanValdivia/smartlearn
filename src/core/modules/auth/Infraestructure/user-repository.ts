import {
    type UpdateUser,
    type CreateUser,
    type GetManyUsersParams,
    type UserFromAPI,
} from "@/core/api/users/types";
import { type IUsersRepository } from "../Domain/user-repository";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";
import { jsonify } from "@/lib/utils";
import { inject, injectable } from "inversify";
import { DI_SYMBOLS } from "@/core/di/types";
import { User, type PrismaClient } from "@prisma/client";
import { hashPassword } from "@/core/api/hash";

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @inject(DI_SYMBOLS.PrismaClient) private _client: PrismaClient,
    ) {}

    async getMany(
        params?: GetManyUsersParams,
    ): Promise<PaginationResponse<User[]>> {
        const { filters } = params || {};

        if (!filters) {
            const users = await this._client.user.findMany();
            return { data: users, total: users.length };
        }

        const users = await this._client.user.findMany({
            where: {
                OR: [
                    { name: { contains: filters?.fullTextSearch } },
                    { email: { contains: filters?.fullTextSearch } },
                    { dni: { contains: filters?.fullTextSearch } },
                ],
                role: filters?.role,
            },
            take: MAX_PAGINATION_SIZE,
            skip: (filters.page - 1) * MAX_PAGINATION_SIZE,
        });

        const total = await this._client.user.count({
            where: {
                OR: [
                    { name: { contains: filters?.fullTextSearch } },
                    { email: { contains: filters?.fullTextSearch } },
                    { dni: { contains: filters?.fullTextSearch } },
                ],
                role: filters?.role,
            },
        });

        return { data: users, total };
    }

    async getById(id: string): Promise<User> {
        const user = await this._client.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async createUser(input: CreateUser): Promise<User> {
        const password = input.password
            ? await hashPassword(input.password)
            : "";

        const user = await this._client.user.create({
            data: {
                ...input,
                password,
            },
        });
        return user;
    }

    async updateUser(id: string, input: UpdateUser): Promise<User> {
        const user = await this._client.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const updatedUser = await this._client.user.update({
            where: {
                id,
            },
            data: input,
        });

        return updatedUser;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this._client.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        await this._client.user.delete({
            where: {
                id,
            },
        });

        return user;
    }

    async existsUserByEmail(email: string): Promise<boolean> {
        const user = await this._client.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return false;
        }

        return true;
    }

    async findUserByDni(dni: string): Promise<User | null> {
        const user = await this._client.user.findUnique({
            where: {
                dni,
            },
        });
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this._client.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}
