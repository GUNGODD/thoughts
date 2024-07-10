import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { decode, sign, verify } from "hono/jwt";
import z from "zod";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

userRouter.get("/", async (c) => {
  const DB_URL = c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasourceUrl: DB_URL,
  }).$extends(withAccelerate());
  return c.text("Hey");
});

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
      message: "Inputs are not correct",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "User created successfully",
      token: token,
    });
  } catch (e) {
    console.error("Error creating user:", e);
    c.status(403);
    return c.text("Something bad happened");
  }
});

userRouter.post("/signin", async (c) => {
  const DB = c.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: { db: { url: DB } },
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success, error } = signinInput.safeParse(body);

  if (!success) {
    console.log("Validation error:", error);
    c.status(411);
    return c.json({
      msg: "Inputs are not correct",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ msg: "User not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "User authenticated successfully",
      token: token,
    });
  } catch (e) {
    console.error("Error finding user:", e);
    c.status(500);
    return c.text("Internal Server Error");
  }
});

export { userRouter };
