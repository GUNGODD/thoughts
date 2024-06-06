import { Hono } from "hono";
export const blogRouter=new Hono();


import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import {decode,sign,verify} from "hono/jwt";

blogRouter.get('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  
  blogRouter.post("/api/v1/blog",(c)=>{
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