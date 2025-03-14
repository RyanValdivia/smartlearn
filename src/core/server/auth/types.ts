import { type Session } from "@/core/api/sessions/types";
import { type Teacher } from "@/core/api/teachers/types";

import { type Student, type User } from "@/core/api/users/types";
import { UserRole } from "@@/drizzle/schemas/auth";
import {
    GraduationCap,
    type LucideProps,
    ShieldUser,
    User as UserIcon,
} from "lucide-react";

export type SessionRole = {
    label: string;
    access: UserRole;
    logo: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
};

export const adminRole: SessionRole = {
    label: "Administrador",
    access: UserRole.ADMIN,
    logo: ShieldUser,
} as const;

export const teacherRole = {
    label: "Profesor",
    access: UserRole.TEACHER,
    logo: GraduationCap,
} as const;

export const studentRole = {
    label: "Estudiante",
    access: UserRole.STUDENT,
    logo: UserIcon,
} as const;

export const SessionRoles = {
    [UserRole.ADMIN]: adminRole,
    [UserRole.TEACHER]: teacherRole,
    [UserRole.STUDENT]: studentRole,
};

export const roleAccessMap = {
    [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
    [UserRole.TEACHER]: [UserRole.TEACHER, UserRole.STUDENT],
    [UserRole.STUDENT]: [UserRole.STUDENT],
};

export type OwnSession = Session & {
    accesibleRoles: UserRole[];
    cycleId: number;
};

export type SessionUser = Omit<User, "password"> & {
    teacher: Teacher | null;
    student: Student | null;
};

export enum UpdateSessionType {
    ACCESS = "ACCESS",
    USER = "USER",
    CYCLE = "CYCLE",
}

export type UpdateSessionAccess = {
    type: UpdateSessionType.ACCESS;
    access: UserRole;
};

export type UpdateSessionUser = {
    type: typeof UpdateSessionType.USER;
    usuarioId: string;
};

export type UpdateSessionCycle = {
    type: typeof UpdateSessionType.CYCLE;
    cycleId: number;
};

export type UpdateSessionPayload =
    | UpdateSessionAccess
    | UpdateSessionUser
    | UpdateSessionCycle;

type AdminAccess = {
    access: UserRole.ADMIN;
    cycleId: null;
    studentId: null;
    teacherId: null;
};

type TeacherAccess = {
    access: UserRole.TEACHER;
    teacherId: string;
    studentId: null;
};

type StudentAccess = {
    access: UserRole.STUDENT;
    cycleId: number;
    studentId: string;
    teacherId: null;
};

export type StrictOwnSession = AdminAccess | TeacherAccess | StudentAccess;
