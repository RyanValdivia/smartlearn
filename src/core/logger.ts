// import pino from "pino";

// export const logger = pino(
//     process.env.NODE_ENV === "development"
//         ? {
//               level: "debug",
//               transport: {
//                   target: "pino-pretty",
//                   options: {
//                       colorize: true,
//                   },
//               },
//           }
//         : {
//               level: "info",
//           },
// );
export const logger = {
    debug: console.debug,
    info: console.info,
    error: console.error,
    warn: console.warn,
    log: console.log,
};
