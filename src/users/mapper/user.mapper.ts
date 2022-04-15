import { User } from "../model.entity";
import { ResponseDto } from "../dto/response.dto";

export class UserMapper {
  static toDto({ id, fullName, email, isActive }: User): ResponseDto {
    const response: ResponseDto = {
      id,
      fullName,
      email,
      isActive
    }
    return response
  }

  static toDtos= (user: User): ResponseDto => {
    const users = this.toDto(user)
    return users
  }
   
}