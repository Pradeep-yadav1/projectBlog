import { z } from "zod";

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(4),
    name:z.string().optional()
})

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(4),
})

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),

})

export const updateBlogInput = z.object({
    id:z.string(),
    title:z.string(),
    content:z.string(),
    published:z.boolean().optional()
})

export const specificBlogInput = z.object({
   id:z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>
export type SpecificBlogInput = z.infer<typeof specificBlogInput>