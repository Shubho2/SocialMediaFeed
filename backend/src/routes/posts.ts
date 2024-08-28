import express from 'express';
import PostController from '../controllers/PostController';

const router = express.Router();

router.get('/', PostController.getPosts);
router.post('/', PostController.createPost);
router.patch('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.patch('/:id/likePost', PostController.likePost);

export default router;