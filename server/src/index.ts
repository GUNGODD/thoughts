import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>;

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup",async (c)=>{
  const DB_URL=c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: DB_URL,
}).$extends(withAccelerate())


  const body=await c.req.json();
   await prisma.user.create({
    data:{
      email:body.email,
      password:body.password
    }
   })

  return c.json({
    message:"This is working"
  })
})

app.post("api/v1/login",(c)=>{
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
    message:"Getting all blogs"
  })
})

export default app
