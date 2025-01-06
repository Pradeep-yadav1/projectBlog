import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify,jwt } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      console.log("inside header")
      return c.json({ msg: "UnAuthorized : missing valid token" }, 401);
    }
    const token = authHeader.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    console.log(payload);
    if (!payload) {
      console.log("inside pauload")
      return c.json({msg:"error occurs in payload"}) 
    }
    c.set("userId", payload.id);
      console.log("hithere")
      return await next();
      console.log("after next",c.req.path);
  } catch (e) {
    if(e instanceof Error)
    return c.json({ error: e.message },403);
  }
});

blogRouter.post("/create", async (c) => {
  try {
    console.log("inside")
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        published: body.published,
      },
    });
    return c.json({
      msg: "post created successfully",
      id: post.id,
    });
  } catch (e : unknown) {
    if(e instanceof Error){
      return c.json({ msg:e.message|| "internal server error" }, 500);
    }
  }
});

blogRouter.put("/update", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published:body.published
      },
    });

    return c.json({ msg: "updated successfully", post });
  } catch (e) {
    if(e instanceof Error){
      return c.json({ msg:e.message|| "internal server error" }, 500);
    }
  }
});

blogRouter.get("/bulk", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findMany({});

    return c.json(post);
  } catch (e) {
    if(e instanceof Error){
      return c.json({ msg:e.message|| "internal server error" }, 500);
    }
  }
});


blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return c.json(post);
  } catch (e) {
    if(e instanceof Error){
      return c.json({ msg:e.message|| "internal server error" }, 500);
    }
  }
});


// blogRouter.all("*", async (c) => {
//   return c.json({ msg: `Route matched: ${c.req.method} ${c.req.path}` });
// });
