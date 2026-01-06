import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
	...authTables,
	// ✅ users を公式通りにインライン定義
	users: defineTable({
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.number()),
		isAnonymous: v.optional(v.boolean()),

		// 👇 追加フィールド
		role: v.optional(
			v.union(v.literal("admin"), v.literal("worker"), v.literal("company")),
		),
	}).index("email", ["email"]),
	/* =========================
	 * Profiles
	 * ========================= */
	profiles: defineTable({
		// 本人確認済みかどうか
		// デフォルトはfalse
		isVerified: v.boolean(),
		// 生年月日
		birthday: v.string(),
		// オンボーディング済みかどうか
		isOnboarded: v.boolean(),
		// 郵便番号
		postalCode: v.optional(v.string()),
		// 住所
		address: v.string(),
		// 住所(マンション名など)
		addressDetail: v.optional(v.string()),
		// 作成日時
		createdAt: v.number(),
		// 更新日時
		updatedAt: v.number(),
		// ユーザーID
		userId: v.id("users"),
	}).index("byUserId", ["userId"]),
	numbers: defineTable({
		value: v.number(),
	}),
});
