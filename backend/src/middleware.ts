import { Hono } from 'hono'
import { verify } from "hono/jwt";

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