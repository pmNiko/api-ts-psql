"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.Router();
router.route('/')
    .get(post_controller_1.getPosts)
    .post(post_controller_1.createPost);
router.route('/:id')
    .get(post_controller_1.getPostById)
    .delete(post_controller_1.deletePostById)
    .put(post_controller_1.updatePostById);
exports.default = router;
//# sourceMappingURL=post.routes.js.map