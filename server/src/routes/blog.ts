import { Hono } from "hono";



import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {decode,sign,verify} from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },Variables:{
      userId:string;
    }
  }>();

blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("authorization");
    const user=await verify(authHeader ||"",c.env.JWT_SECRET);
    if(user){
      c.set("userId",user.id as string);
      next();
    }
    else{
      c.status(403);
      return c.json({
        message:"You are not logged in"
      })
    }
})

blogRouter.get('/', async (c) => {
  const body=await c.req.json();
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try{
  const Post=await prisma.post.findFirst({
    where:{
      id:body.id,
    }
  })
  return c.json({
    Post
  })
}
catch(e){
  c.status(411);
  return c.json({
    message:"Error while fetching post"
  })
}
  })
  
  
  blogRouter.post("/",async (c)=>{
    const body=await c.req.json();
    const authorId=c.get("userId");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const Post= await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
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