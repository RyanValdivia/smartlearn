import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Jsonify } from "type-fest";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function jsonify<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as Jsonify<T>;
}
