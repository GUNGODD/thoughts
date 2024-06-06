import { Hono } from "hono";



import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {decode,sign,verify} from "hono/jwt";

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

blogRouter.use("/*",(c,next)=>{
    next();
})

blogRouter.get('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  
  blogRouter.post("/api/v1/blog",async (c)=>{
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:"1"
        }
    })
    return c.json({
      message:"Blog post route also working"
    })
  })
  
  blogRouter.put("/api/v1/blog",(c)=>{
    return c.json({
      message:"Blog PUT api is also working"
    })
  })
  
  blogRouter.get("/api/v1/blog/:id",(c)=>{
    return c.json({
      message:"Getting all blogs by given id"
    })
  })
  
  blogRouter.get("/api/v1/blog/bulk",(c)=>{
    return c.json({
      message:"Getting all blogs"
    })
  })