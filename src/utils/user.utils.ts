import { isEmail, isStrongPassword } from "validator";

export const validateUserData = (email: string, username: string, password: string) : boolean => {
    if(
        !email || !isEmail(email) ||
        !username || username.length < 5 ||
        !password || !isStrongPassword(password)
    ) {
        return false;
    }

    return true;
}