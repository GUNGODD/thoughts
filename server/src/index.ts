import { Hono } from 'hono'

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup",(c)=>{
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
