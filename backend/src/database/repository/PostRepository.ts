import { Post, PostModel } from '../model/Post';
import { Repository } from './Repository';
import mongoose from 'mongoose';

export class PostRepository implements Repository<Post> {

    constructor() {
        if (!process.env.CONNECTION_URI) {
            throw new Error('Database connection URI is not set');
        }
        mongoose.connect(process.env.CONNECTION_URI)
            .then(() => console.log('Connected to the database'))
            .catch((error) => console.log(error.message));
    }

    isValid(_id: string): boolean {
        return mongoose.Types.ObjectId.isValid(_id);
    }

    /**
     * 
     * @param object post to be created in the database.
     * @returns 
     */
    async create(object: Post): Promise<Post> {
        console.log(`PostRepository: ${object}`);
        return await PostModel.create(object);
    }

    /**
     * 
     * @returns all posts from the database.
     */
    async findAll(): Promise<Post[]> {
        return await PostModel.find();
    }

    /**
     * 
     * @param _id of the post to be updated.
     * @param object post with updated values.
     * @returns updated post.
     */
    async update(_id: string, object: Post): Promise<Post | null> {
        return await PostModel.findByIdAndUpdate(_id, object, { new: true });
    }

    /**
     * 
     * @param _id of the post to be deleted.
     */
    async delete(_id: string): Promise<void> {
        await PostModel.findByIdAndDelete({ _id });
    }

    /**
     * 
     * @returns post with the given id.
     */
    async find(_id: string): Promise<Post | null> {
        return await PostModel.findById(_id);
    }
}
