import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import { Adapter, AdapterUser, AdapterSession } from "next-auth/adapters";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
    return {
        ...PrismaAdapter(prisma),
        createSession: async (data) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return (await prisma.session.create({
                data: {
                    sessionToken: data.sessionToken,
                    userId: user.id,
                    expires: data.expires,
                    sessionRole: user.role,
                },
            })) satisfies AdapterSession;
        },
        getUser: async (id) => {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
                include: {
                    teacher: true,
                    student: true,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user as AdapterUser;
        },

        getUserByEmail: async (email) => {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    teacher: true,
                    student: true,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user as AdapterUser;
        },

        getUserByAccount({ providerAccountId }) {
            return prisma.user.findFirst({
                where: {
                    accounts: {
                        some: {
                            providerAccountId,
                        },
                    },
                },
                include: {
                    teacher: true,
                    student: true,
                },
            }) as unknown as Promise<AdapterUser>;
        },

        updateUser: async ({ id, teacher, student, ...data }) => {
            const user = await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...data,
                    name: data.name ?? undefined,
                },
                include: {
                    teacher: true,
                    student: true,
                },
            });

            return user as AdapterUser;
        },

        deleteUser: async (id) => {
            const user = await prisma.user.delete({
                where: {
                    id,
                },
                include: {
                    teacher: true,
                    student: true,
                },
            });

            return user as AdapterUser;
        },

        getSessionAndUser: async (sessionToken) => {
            const session = await prisma.session.findUnique({
                where: {
                    sessionToken,
                },
                include: {
                    user: {
                        include: {
                            teacher: true,
                            student: true,
                        },
                    },
                },
            });

            if (!session) {
                return null;
            }

            return {
                user: session.user as AdapterUser,
                session: session as AdapterSession,
            };
        },
        updateSession: async (data) => {
            return prisma.session.update({
                where: {
                    sessionToken: data.sessionToken,
                },
                data,
            });
        },
        deleteSession: async (sessionToken) => {
            const session = await prisma.session.delete({
                where: {
                    sessionToken,
                },
            });

            return session as AdapterSession;
        },
    };
}
