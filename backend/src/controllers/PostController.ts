import { PostRepository }  from "../database";
import LocalLogger from "../core/LocalLogger";

class PostController {

    private static postRepository: PostRepository =  new PostRepository();
    private static logger = LocalLogger.getLogger();

    static getPostRepository() {
        PostController.logger.info("PostController: getPostRepository is called");
        return PostController.postRepository;
    }

    static setPostRepository(postRepository: PostRepository) {
        PostController.postRepository = postRepository;
    }
    
    static async createPost(request, response) {
        PostController.logger.info("PostController: createPost is called");
        const post = request.body;
        try {
            const newPost  = await PostController.postRepository.create({...post, creator: request.userId, createdAt: new Date().toISOString()});
            response.status(201).json(newPost);
        } catch (error: any) {
            response.status(409).json({ message: error.message });
        }
    }

    static async getPosts(request, response) {
        PostController.logger.info("PostController: getPosts is called");
        try {
            const posts = await PostController.postRepository.findAll();
            response.status(200).json(posts);
        } catch (error: any) {
            response.status(404).json({ message: error.message });
        }
    }

    static async updatePost(request, response) {
        PostController.logger.info("PostController: updatePost is called");
        const { id: _id } = request.params;
        const post = request.body;
        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send('Not a valid id');
        }
        const updatedPost = await PostController.postRepository.update(_id, post);
        response.status(200).json(updatedPost);
    }

    static async deletePost(request, response) {
        PostController.logger.info("PostController: deletePost is called");
        const { id: _id } = request.params;
        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send("Not a valid id");
        }
        
        await PostController.postRepository.delete(_id);
        response.status(200).json({message: "Post deleted successfully"});
    }

    static async likePost(request, response) {
        PostController.logger.info("PostController: likePost is called");
        const { id: _id } = request.params;

        if(!request.userId) {
            return response.status(401).json({ message: "Unauthorized" });
        }

        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send("Not a valid id");
        } else {
            const post = await PostController.postRepository.find(_id);
            if (!post) {
                return response.status(404).send("No post with that id");
            }

            const index = post.likes.findIndex((id) => id === String(request.userId));

            if(index === -1) {
                post.likes.push(request.userId);
            } else {
                post.likes = post.likes.filter((id) => id !== String(request.userId));
            }

            const updatedPost = await PostController.postRepository.update(_id, post);
            response.status(200).json(updatedPost);
        }
    }
}

export default PostController;