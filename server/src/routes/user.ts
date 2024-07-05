import { Hono } from "hono";

import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { decode, sign, verify } from "hono/jwt";
import z from "zod";
import { signupInput } from "../../../common/src/zod";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();



//Testing
userRouter.get("/",async (c)=>{
  const DB_URL=c.env.DATABASE_URL;
  const prisma=new PrismaClient({
    datasourceUrl:DB_URL,
  }).$extends(withAccelerate());
  return c.text("Hey")
})

userRouter.post("/signup", async (c) => {
  const DB_URL = c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: { db: { url: DB_URL } },
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = signupInput.safeParse(body);

  if (!success) {
    console.log("Validation Error:", error);
    c.status(411);
    return c.json({
      message: "Inputs are not correct"
    });
  }

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
    console.error("Error creating user:", e);
    c.status(403);
    return c.text("Something bad happened");
  }
});
  

  export{userRouter};
