import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import type { DataModel } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password<DataModel>({
			id: "password-custom",
			profile(params, _ctx) {
				return {
					email: params.email as string,
					role: params.role as "admin" | "worker" | "company",
				};
			},
		}),
	],
	callbacks: {
		async afterUserCreatedOrUpdated(
			ctx: MutationCtx,
			{ userId, existingUserId },
		) {
			// 既存ユーザーの再ログイン時は何もしない
			if (existingUserId) return;

			// profile がすでにあるか確認（安全対策）
			const existingProfile = await ctx.db
				.query("profiles")
				.withIndex("byUserId", (q) => q.eq("userId", userId))
				.unique();

			// すでにprofileがある場合は何もしない
			if (existingProfile) return;

			// profile を作成
			await ctx.db.insert("profiles", {
				userId,
				isVerified: false,
				isOnboarded: false,
				birthday: "",
				address: "",
				postalCode: undefined,
				addressDetail: undefined,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
		},
	},
});
