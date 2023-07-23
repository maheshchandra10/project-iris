import { createTRPCRouter } from '~/server/api/trpc'
import { exampleRouter } from '~/server/api/routers/example'
import { excercisesPropsRouter as excercisePropsRouter, userRouter } from '~/server/api/routers/app'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  getExcerciseProps: excercisePropsRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
