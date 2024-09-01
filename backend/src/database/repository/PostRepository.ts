import { Post, PostModel } from '../model/Post';
import { Repository } from './Repository';

export class PostRepository extends Repository<Post> {

    /**
     * 
     * @param object post to be created in the database.
     * @returns 
     */
    async create(object: Post): Promise<Post> {
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
