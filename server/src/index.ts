import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import {decode,sign,verify} from "hono/jwt";

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string

  }
}>;

app.use("/api/v1/blog*", async(c,next)=>{
  const header=c.req.header("Authorization") || ""; 
    const response=await verify(header,c.env.JWT_SECRET);
    if(response.id){
      next();  
    }
    else{
      c.status(403);
      return c.json({
          "message":"Wrong inputs"
      })
    }
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup",async (c)=>{
  const DB_URL=c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: DB_URL,
}).$extends(withAccelerate())


  const body=await c.req.json();
   const user = await prisma.user.create({
    data:{
      email:body.email,
      password:body.password
    } 
   })

   const token = await sign({id:user.id},c.env.JWT_SECRET )

  return c.json({
    message:"This is working",
    token:token
  })
})

app.post("api/v1/login",async (c)=>{
  const DB_URL=c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: DB_URL,
}).$extends(withAccelerate())

  const body=await c.req.json();
  const user=await prisma.user.findUnique({
    where:{
      email:body.email, 
      password:body.password
    }
  })

  if(!user){
    c.status(401);
    return c.json({
      "message":"User not found"
    })
    
  }
  const jwt=await sign({id:user.id},c.env.JWT_SECRET)

  return c.json({
    message:"Login route is also working"
  })
})

app.post("/api/v1/blog",(c)=>{
  return c.json({
    message:"Blog post route also working"
  })
})

app.put("/api/v1/blog",(c)=>{
  return c.json({
    message:"Blog PUT api is also working"
  })
})

app.get("/api/v1/blog/:id",(c)=>{
  return c.json({
    message:"Getting all blogs by given id"
  })
})

app.get("/api/v1/blog/bulk",(c)=>{
  return c.json({
    message:"Getting all blogs"
  })
})

export default app
