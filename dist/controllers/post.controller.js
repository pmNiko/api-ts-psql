"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostById = exports.deletePostById = exports.getPostById = exports.createPost = exports.getPosts = void 0;
const database_1 = require("../database");
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connection();
            const { rows } = yield conn.query('SELECT * FROM posts');
            conn.end();
            return res.json({ posts: rows });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getPosts = getPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, image_url } = req.body;
        try {
            const conn = yield database_1.connection();
            yield conn.query('INSERT INTO posts(title,description,image_url)values($1,$2,$3)', [title, description, image_url]);
            conn.end();
            return res.json({
                msg: 'Post added succesfully!',
                body: {
                    post: title, description, image_url
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createPost = createPost;
function getPostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connection();
            const { rows } = yield conn.query('SELECT * FROM posts WHERE id= $1', [id]);
            return res.json({ post: rows });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getPostById = getPostById;
function deletePostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const conn = yield database_1.connection();
            const { rowCount } = yield conn.query('DELETE FROM posts WHERE id= $1', [id]);
            if (rowCount === 0)
                return res.status(400).json({ msg: `Post whith id: ${id} not exists!` });
            return res.json({ post: "delete" });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deletePostById = deletePostById;
function updatePostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { title, description, image_url } = req.body;
        try {
            const conn = yield database_1.connection();
            const { rowCount } = yield conn.query('UPDATE posts  SET title=$2, description=$3, image_url=$4  WHERE id= $1', [id, title, description, image_url]);
            if (rowCount === 0)
                return res.status(400).json({ msg: `Post whith id: ${id} not exists!` });
            return res.json({
                msg: 'Post updated succesfully!',
                body: {
                    post: { title, description, image_url }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updatePostById = updatePostById;
//# sourceMappingURL=post.controller.js.map