import { Length } from "class-validator";
import { LoginInput } from "./Login";


export class SignupInput extends LoginInput{
    @Length(10,12)
    phone : string;
}