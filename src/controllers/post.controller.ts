import { Request, Response } from "express";
import { connection } from "../database";
import { Post } from "../interface/Post";

export async function getPosts(req: Request<null>, res: Response) {

  try {
    const conn = await connection()

    const { rows } = await conn.query('SELECT * FROM posts')

    conn.end()

    return res.json({ posts: rows })

  } catch (error) {
    console.log(error);

  }
}

export async function createPost(req: Request<Post>, res: Response) {
  const { title, description, image_url }: Post = req.body

  try {
    const conn = await connection()

    await conn.query('INSERT INTO posts(title,description,image_url)values($1,$2,$3)', [title, description, image_url])
    conn.end()

    return res.json({
      msg: 'Post added succesfully!',
      body: {
        post: title, description, image_url
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(req: Request, res: Response) {
  const id: string = req.params.id
  try {
    const conn = await connection()

    const { rows } = await conn.query('SELECT * FROM posts WHERE id= $1', [id])

    return res.json({ post: rows })

  } catch (error) {
    console.log(error)
  }


}

export async function deletePostById(req: Request, res: Response) {
  const id: string = req.params.id
  try {
    const conn = await connection()

    const { rowCount } = await conn.query('DELETE FROM posts WHERE id= $1', [id])

    if (rowCount === 0) return res.status(400).json({ msg: `Post whith id: ${id} not exists!` })


    return res.json({ post: "delete" })

  } catch (error) {
    console.log(error)
  }
}

export async function updatePostById(req: Request, res: Response) {
  const id: string = req.params.id
  const { title, description, image_url }: Post = req.body

  try {
    const conn = await connection()

    const { rowCount } = await conn.query('UPDATE posts  SET title=$2, description=$3, image_url=$4  WHERE id= $1', [id, title, description, image_url])

    if (rowCount === 0) return res.status(400).json({ msg: `Post whith id: ${id} not exists!` })


    return res.json({
      msg: 'Post updated succesfully!',
      body: {
        post: { title, description, image_url }
      }
    })

  } catch (error) {
    console.log(error)
  }
}

