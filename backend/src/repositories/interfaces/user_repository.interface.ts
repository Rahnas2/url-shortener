import { DeleteResult } from "mongoose";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";

export interface IUserRepository {
    createUser (createUserDto: CreateUserDto): Promise<UserDocument>
    findUserByEmail (email: string): Promise<UserDocument | null>
    findUserByIdAndUpdate (id: string, data: Partial<User>): Promise<UserDocument | null>
    deleteUserById (id: string) : Promise<UserDocument | null>
}