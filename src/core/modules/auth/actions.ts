"use server";

import { getInjection } from "@/core/di/container";

export async function signIn() {
    const userController = getInjection("UsersController");

    // return await userController.createUser({
    //     data
    // });
}
