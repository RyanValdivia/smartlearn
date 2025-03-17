/* 
TODO separar por modelo
//modelo
    IModeloRepository :  Symbol.for("IModeloRepository"),
    IModeloService :  Symbol.for("IModeloService"),
*/
export const DI_SYMBOLS = {
    PrismaClient: Symbol.for("PrismaClient"),
    // User
    IUsersRepository: Symbol.for("IUsersRepository"),
    IUsersService: Symbol.for("IUsersService"),

    //Account
    IAccountsRepository: Symbol.for("IAccountsRepository"),

    //Auth
    IAuthService: Symbol.for("IAuthService"),

    //Teacher
    ITeachersService: Symbol.for("ITeachersService"),
    ITeachersRepository: Symbol.for("ITeachersRepository"),
};
