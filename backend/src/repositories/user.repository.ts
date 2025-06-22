import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import { IUserRepository } from "./interfaces/user_repository.interface";

@Injectable()     
export class UserRepository implements IUserRepository{

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser (createUserDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(createUserDto)
    }

    async findUserByEmail (email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({email})
    } 

    async findUserByIdAndUpdate (id: string, data: Partial<User>) {
        return await this.userModel.findByIdAndUpdate(id, data, {new: true})
    }

    async deleteUserById (id: string) {
        return await this.userModel.findByIdAndDelete(id)
    }

}