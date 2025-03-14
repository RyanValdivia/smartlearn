import { type PaginationResponse } from "@/core/api";
import {
    type TeacherQueryFilters,
    type CreateTeacher,
    type GetManyTeachersParams,
    type Teacher,
} from "@/core/api/teachers/types";
import { type ITeachersRepository } from "../Domain/teacher-repository";
import { db } from "@@/drizzle/client";
import { teachersTable } from "@@/drizzle/schemas/teacher";
import { type PaginationParams } from "@/utils/types";
import { and, eq, exists, ilike, or, count } from "drizzle-orm";
import { UserRole, usersTable } from "@@/drizzle/schemas/auth";
import { MAX_PAGINATION_SIZE } from "@/core/constants";

export class TeachersRepository implements ITeachersRepository {
    async getMany(
        params?: GetManyTeachersParams,
    ): Promise<PaginationResponse<Teacher[]>> {
        const { filters } = params || {};

        const [teachers, totalResult] = await Promise.all([
            db
                .select({
                    teacher: teachersTable,
                    user: usersTable,
                })
                .from(teachersTable)
                .innerJoin(usersTable, eq(teachersTable.userId, usersTable.id))
                .where(filters ? this._createWhere(filters) : undefined)
                .limit(MAX_PAGINATION_SIZE)
                .offset(
                    filters?.page
                        ? (filters.page - 1) * MAX_PAGINATION_SIZE
                        : 0,
                ),
            db
                .select({ count: count() })
                .from(teachersTable)
                .where(
                    filters?.fullTextSearch
                        ? or(
                              ilike(usersTable.name, filters.fullTextSearch),
                              ilike(usersTable.email, filters.fullTextSearch),
                              ilike(usersTable.dni, filters.fullTextSearch),
                          )
                        : undefined,
                ),
        ]);

        return {
            data: teachers.map((teacher) => ({
                user: teacher.user,
                id: teacher.teacher.id,
                userId: teacher.teacher.userId,
            })),
            total: totalResult[0].count,
        };
    }

    async createTeacher(
        userId: string,
        _input: CreateTeacher,
    ): Promise<Teacher> {
        const [teacher] = await db.insert(teachersTable).values({
            userId: userId,
        });

        return teacher;
    }

    private _createWhere(filters: PaginationParams<TeacherQueryFilters>) {
        return and(
            eq(usersTable.role, UserRole.TEACHER),
            exists(
                db
                    .select()
                    .from(teachersTable)
                    .where(eq(teachersTable.userId, usersTable.id)),
            ),

            filters.fullTextSearch
                ? or(
                      ilike(usersTable.name, filters.fullTextSearch),
                      ilike(usersTable.email, filters.fullTextSearch),
                      ilike(usersTable.dni, filters.fullTextSearch),
                  )
                : undefined,
        );
    }
}
