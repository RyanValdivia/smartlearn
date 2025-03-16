import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types";
import { TeachersRepository } from "@/core/modules/teachers/Infraestructure/teacher-repository";
import { TeachersService } from "@/core/modules/teachers/Application/Services/teacher-service";
import { TeachersController } from "@/core/modules/teachers/Application/Controllers/teacher-controller";

export function createTeacherModule() {
    const teacherModule = createModule();

    if (process.env.NODE_ENV === "test") {
        // TODO: Implement test module
    } else {
        // Repositories
        teacherModule
            .bind(DI_SYMBOLS.ITeachersRepository)
            .toClass(TeachersRepository);
        // Services
        teacherModule
            .bind(DI_SYMBOLS.ITeachersService)
            .toClass(TeachersService, [DI_SYMBOLS.ITeachersRepository]);
        // Controllers
        teacherModule
            .bind(DI_SYMBOLS.TeachersController)
            .toClass(TeachersController, [DI_SYMBOLS.ITeachersService]);
    }

    return teacherModule;
}
