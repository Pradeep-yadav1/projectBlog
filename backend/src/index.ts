import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "hono/adapter";
import { decode, jwt, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId:string;
  }
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return c.json({ msg: "UnAuthorized : missing valid token" }, 401);
  }

  const token = authHeader.split(" ")[1];
  const payload= await verify(token, c.env.JWT_SECRET);
  if (!payload.id) {
    return c.json({ msg: "unauthorized access" }, 403);
  }
//@ts-ignore
  c.set("userId", payload.id);
  await next();
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(body.password, saltRounds);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashPassword,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ msg: "user created successfully", token: token });
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    return c.json({ msg: "User not found" }, 403);
  }
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    c.status(411);
    return c.json({
      msg: "Invalid password",
    });
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    msg: "Signin successfully",
    token: token,
  });
});

app.post("/api/v1/blog", (c) => {
  return c.json("Hello Hono!");
});
app.put("/api/v1/blog/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;
