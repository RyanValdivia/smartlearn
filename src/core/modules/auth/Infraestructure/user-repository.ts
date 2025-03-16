import {
    type UpdateUser,
    type CreateUser,
    type GetManyUsersParams,
    type UserFromAPI,
} from "@/core/api/users/types";
import { type IUsersRepository } from "../Domain/user-repository";
import { type PaginationResponse } from "@/core/api";
import { MAX_PAGINATION_SIZE } from "@/core/constants";
import { db } from "@/core/server/db";
import { jsonify } from "@/lib/utils";
export class UsersRepository implements IUsersRepository {
    async existsUserByEmail(email: string): Promise<boolean> {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return false;
        }

        return true;
    }

    async findUserByDni(dni: string): Promise<UserFromAPI | null> {
        const user = await db.user.findUnique({
            where: {
                dni,
            },
        });

        return jsonify(user);
    }

    async findUserByEmail(email: string): Promise<UserFromAPI | null> {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        return jsonify(user);
    }

    async getMany(
        params?: GetManyUsersParams,
    ): Promise<PaginationResponse<UserFromAPI[]>> {
        const { filters } = params || {};

        if (!filters) {
            const users = await db.user.findMany();
            return { data: jsonify(users), total: users.length };
        }

        const users = await db.user.findMany({
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

        const total = await db.user.count({
            where: {
                OR: [
                    { name: { contains: filters?.fullTextSearch } },
                    { email: { contains: filters?.fullTextSearch } },
                    { dni: { contains: filters?.fullTextSearch } },
                ],
                role: filters?.role,
            },
        });

        return { data: jsonify(users), total };
    }

    async createUser(input: CreateUser): Promise<UserFromAPI> {
        const user = await db.user.create({
            data: input,
        });
        return jsonify(user);
    }

    async updateUser(id: string, input: UpdateUser): Promise<UserFromAPI> {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const updatedUser = await db.user.update({
            where: {
                id,
            },
            data: input,
        });

        return jsonify(updatedUser);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        await db.user.delete({
            where: {
                id,
            },
        });
    }
}
