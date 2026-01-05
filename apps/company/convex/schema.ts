import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
	...authTables,
	users: defineTable({
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		role: v.optional(
			v.union(v.literal("admin"), v.literal("worker"), v.literal("company")),
		),
		isAnonymous: v.optional(v.boolean()),
		// other "users" fields...
	}).index("email", ["email"]),
	numbers: defineTable({
		value: v.number(),
	}),
});
