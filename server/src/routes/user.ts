import { Hono } from "hono";

import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { decode, sign, verify } from "hono/jwt";


const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post("/signup", async (c) => {
    const DB_URL = c.env.DATABASE_URL;
    const prisma = new PrismaClient({
      datasourceUrl: DB_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      });
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  
      return c.json({
        message: "This is working",
        token: token
      });
    } catch (e) {
      c.status(403);
      return c.text("User already exists");
    }
  });
  

  export{userRouter};
