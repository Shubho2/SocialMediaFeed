import { PostRepository }  from "../database";

class PostController {

    private static postRepository: PostRepository =  new PostRepository();

    static getPostRepository() {
        return PostController.postRepository;
    }

    static setPostRepository(postRepository: PostRepository) {
        PostController.postRepository = postRepository;
    }
    
    static async createPost(request, response) {
        const post = request.body;
        try {
            const newPost  = await PostController.postRepository.create(post);
            response.status(201).json(newPost);
        } catch (error: any) {
            response.status(409).json({ message: error.message });
        }
    }

    static async getPosts(request, response) {
        try {
            const posts = await PostController.postRepository.findAll();
            response.status(200).json(posts);
        } catch (error: any) {
            response.status(404).json({ message: error.message });
        }
    }

    static async updatePost(request, response) {
        const { id: _id } = request.params;
        const post = request.body;
        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send('Not a valid id');
        }
        const updatedPost = await PostController.postRepository.update(_id, post);
        response.status(200).json(updatedPost);
    }

    static async deletePost(request, response) {
        const { id: _id } = request.params;
        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send("Not a valid id");
        }
        
        await PostController.postRepository.delete(_id);
        response.status(200).json({message: "Post deleted successfully"});
    }

    static async likePost(request, response) {
        const { id: _id } = request.params;
        if (!PostController.postRepository.isValid(_id)) {
            return response.status(404).send("Not a valid id");
        } else {
            const post = await PostController.postRepository.find(_id);
            if (!post) {
                return response.status(404).send("No post with that id");
            }

            post.likeCount += 1;
            const updatedPost = await PostController.postRepository.update(_id, post);
            response.status(200).json(updatedPost);
        }
    }
}

export default PostController;