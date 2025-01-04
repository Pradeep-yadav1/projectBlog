import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono<{
  Bindings:{
    DATABASE_URL :string
  }
}>()

app.post('/api/v1/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();

  await prisma.user.create({
    data:{
      name:body.name,
      email:body.email,
      password:body.password
    },
  })
  
  return c.text('Hello Hono!')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
