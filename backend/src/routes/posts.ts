import express from 'express';
import PostController from '../controllers/PostController';
import Auth from '../middleware/Auth';

const router = express.Router();

router.get('/', PostController.getPosts);
router.post('/', Auth.authenticate, PostController.createPost);
router.patch('/:id', Auth.authenticate, PostController.updatePost);
router.delete('/:id', Auth.authenticate, PostController.deletePost);
router.patch('/:id/likePost', Auth.authenticate, PostController.likePost);

export default router;