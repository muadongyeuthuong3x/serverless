import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const APP_SECRET = "secret_key";

export const GetSalt = async () => {
    return await bcrypt.genSalt()
}

export const GetHashedPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
    enterPassword: string,
    savePassword: string,
    salt: string
) => {
    return (await GetHashedPassword(enterPassword, salt) == savePassword)
}

export const GetToken = ({ email, phone, userType, user_id }: UserModel) => {
    return jwt.sign({
        email,
        user_id,
        phone,
        userType
    }, APP_SECRET, {
        expiresIn: "10d"
    })
}

export const VerifyToken = async ( token : string): Promise<UserModel | false> =>{
   try {
      if(token !== "") {
        const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
        return payload as UserModel;
      }
      return false;
   } catch (error) {
    return false
   }
}