import { User, UserModel } from '../model/User';
import { Repository } from './Repository';

export class UserRepository extends Repository<User> {

    async create(object: User): Promise<User> {
        return UserModel.create(object);
    }

    async find(_id: string): Promise<User | null> {
        return UserModel.findById(_id);
    }

    async delete(_id: string): Promise<void> {
        UserModel.findByIdAndDelete({ _id });
    }

    async findAll(): Promise<User[]> {
        return UserModel.find();
    }

    async update(_id: string, object: User): Promise<User | null> {
        return UserModel.findByIdAndUpdate(_id, object, { new: true });
    }


    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email });
    }
}
