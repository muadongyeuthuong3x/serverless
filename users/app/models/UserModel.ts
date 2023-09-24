import  {AddressModel} from './AddressModel'

export class UserModel{
   phone : string;
   email : string;
   password : string;
   salt : string;
   userType : string;
   user_id?: number;
   last_name?: string;
   first_name?: string;
   profile_pic?: string;
   verification_code?: number;
   expiry? : string;
   address? : AddressModel[];
}