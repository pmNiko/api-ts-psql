import { Router } from "express";
import { createPost, deletePostById, getPostById, getPosts, updatePostById } from "../controllers/post.controller";

const router = Router()

router.route('/')
  .get(getPosts)
  .post(createPost)

router.route('/:id')
  .get(getPostById)
  .delete(deletePostById)
  .put(updatePostById)

export default router