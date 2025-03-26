import { handleNotify } from "./handleNotify";


export const authorize = (userRole: string) => {
    if (userRole) return true;
    handleNotify("You must be logged in do this action", "", "warning")
    return false;
}