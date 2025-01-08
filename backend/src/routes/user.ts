import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";
import { hashPassword ,verifyPassword} from "../utilis/hashPassword";
import {signupInput ,signinInput} from "@pradeep0123yadav/common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
  try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      return c.json({msg:"Inputs are not correct"},411);
    }
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
  }catch(e){
    if(e instanceof Error){
      return c.json({msg:e.message},403)
    }
  }
  });
  
  userRouter.post("/signin", async (c) => {
    try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      return c.json({msg:"Inputs are not correct"},411);
    }
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
  