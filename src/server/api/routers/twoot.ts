import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const twootRouter = createTRPCRouter({
    infiniteFeed: publicProcedure.input(
        z.object({
            limit: z.number().optional(),
            cursor: z.object({
                id: z.string(), 
                createdAt: z.date()
            }).optional(),
        })
    ).query(async ({ input: { limit = 10, cursor }, ctx }) => {
        const currentUserId = ctx.session?.user?.id;
        const twoots = await ctx.prisma.twoot.findMany({
            take: limit + 1,
            cursor: cursor ? { createdAt_id: cursor } : undefined,
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            select: {
                id: true,
                content: true,
                createdAt: true,
                _count: { select : { Likes: true } },
                Likes:
                    currentUserId == null ? false : {
                        where: { userId: currentUserId },
                    },
                user: {
                    select: { name: true, id: true, image: true },
                },
            }
        });

        let nextCursor: typeof cursor | undefined;
        if (twoots.length > limit) {
            const nextItem = twoots.pop();
            if (nextItem != null) {
                nextCursor = {
                    id: nextItem.id,
                    createdAt: nextItem.createdAt,
                }
            }
        }


        return {twoots: twoots, nextCursor}
    }),
    create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async({ input: { content }, ctx}) => {
        const twoot = await ctx.prisma.twoot.create(
            { 
                data: { 
                    content,
                    userId: ctx.session.user.id 
                }
            }
        );

        return twoot;
    }),
    toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
        const data = { twootId: id, userId: ctx.session.user.id };
        
        const existingLike = await ctx.prisma.like.findUnique({
            where: { userId_twootId: data }
        })

        if (existingLike == null) {
            await ctx.prisma.like.create({ data });
            return { addedLike: true}
        } else {
            await ctx.prisma.like.delete({
                where: {
                    userId_twootId: data,
                }
            });
            return { addedLike: false}
        }
    })
});