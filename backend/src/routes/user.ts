import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { hashPassword ,verifyPassword} from "../utilis/hashPassword";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "user created successfully", token: token });
  });
  
  userRouter.post("/signin", async (c) => {
    try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.json({ msg: "User not found" }, 403);
    }
    const isPasswordValid = await verifyPassword(user.password, body.password);
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
  }catch(e){
      console.error("error while signing");
      return c.json({msg:"errr" },500)
    
  }
  });
  