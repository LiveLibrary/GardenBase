import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("times").collect();
  },
});

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    time: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("times", {
      time: args.time,
    });
    return id;
  },
});
