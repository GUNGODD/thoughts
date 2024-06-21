import { Hono } from "hono";



import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {decode,sign,verify} from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

blogRouter.use("/*",(c,next)=>{
    next();
})

blogRouter.get('/', async (c) => {
  const body=await c.req.json();
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const Post=await prisma.post.findFirst({
    where:{
      id:body.id,
    }
  })
  return c.json({
    Post
  })
  })
  
  
  blogRouter.post("/",async (c)=>{
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const Post= await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:"1"
        }
    })
    return c.json({
        id:Post.id,
      message:"Blog post route also working"
    })
  })
  
  blogRouter.put("/",async (c)=>{
    const body=await c.req.json();
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const Post=await prisma.post.update({
      where:{
        id:body.id,
      },
      data:{
        title:body.title,
        content:body.content
      }
    })
    return c.json({
      id:Post.id
    })
  })
  
  blogRouter.get("/:id",async (c)=>{
    const body=await c.req.json();
    return c.json({
      message:"Getting all blogs by given id"
    })
  })
  
  blogRouter.get("/bulk",async(c)=>{
    
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const Posts=await prisma.post.findMany();
    return c.json({
      Posts
    })
  })