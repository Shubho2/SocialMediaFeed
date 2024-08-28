import { model, Schema } from 'mongoose';

const DOC_NAME = 'Post';
const COLLECTION_NAME = 'posts';

interface Post {
    title: string,
    message: string,
    creator: string,
    tags: [string],
    selectedFile: string,
    likeCount: number,
    createdAt: Date
} 

const postSchema =  new Schema<Post>({
    title: {
        type: Schema.Types.String,
        trim: true,
        maxlength: 100,
    },
    message: {
        type: Schema.Types.String,
        trim: true,
        maxlength: 2000,
    },
    creator: {
        type: Schema.Types.String,
        trim: true,
        maxlength: 50,
    },
    tags: {
        type: [Schema.Types.String],
        maxlength: 15,
    },
    selectedFile: {
        type: Schema.Types.String,
    },
    likeCount: {
        type: Schema.Types.Number,
        default: 0
    },
    createdAt: {
        type: Schema.Types.Date,
        default: new Date()
    }
});

const PostModel = model<Post>(DOC_NAME, postSchema, COLLECTION_NAME);

export { Post, PostModel };

