import { User } from "../model-user";
import { ResponseDto } from "../dto/response.dto";

export class UserMapper{
static staticToUserDto(user: User):ResponseDto{
const {id, fullName, email, isActive}=user
const response:ResponseDto ={
  id, 
  fullName, 
  email, 
  isActive
}
return response
}
}