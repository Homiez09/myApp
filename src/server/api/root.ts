import { createTRPCRouter } from "~/server/api/trpc";
import { twootRouter } from "./routers/twoot";
import { todoRouter } from "./routers/todo";

export const appRouter = createTRPCRouter({
  twoot: twootRouter,
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;