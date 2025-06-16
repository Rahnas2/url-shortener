import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";

@Injectable()     
export class UserRepository {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser (createUserDto: CreateUserDto): Promise<UserDocument> {
        return await this.userModel.create(createUserDto)
    }

    async findUserByEmail (email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email})
    } 

    findUserByIdAndUpdate (id: string, data: Partial<User>) {
        return this.userModel.findByIdAndUpdate(id, data, {new: true})
    }

    deleteUserById (id: string) {
        return this.userModel.findByIdAndDelete(id)
    }

}