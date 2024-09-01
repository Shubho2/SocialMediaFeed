import { model, Schema, Types } from 'mongoose';

const DOC_NAME = 'User';
const COLLECTION_NAME = 'users';

interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
} 

const userSchema =  new Schema<User>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    }
});

const UserModel = model<User>(DOC_NAME, userSchema, COLLECTION_NAME);

export { User, UserModel };

