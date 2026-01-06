"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
	const { signIn } = useAuthActions();
	const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	return (
		<div className="mx-auto flex h-screen w-full max-w-lg flex-col items-center justify-center gap-8 px-4">
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="flex items-center gap-6">
					<Image src="/convex.svg" alt="Convex Logo" width={90} height={90} />
				</div>
				<h1 className="font-bold text-3xl text-slate-800 dark:text-slate-200">
					Worker
				</h1>
			</div>
			<form
				className="flex w-full flex-col gap-4 rounded-2xl border border-slate-300 bg-slate-100 p-8 shadow-xl dark:border-slate-600 dark:bg-slate-800"
				onSubmit={(e) => {
					e.preventDefault();
					setLoading(true);
					setError(null);
					const formData = new FormData(e.target as HTMLFormElement);
					formData.set("flow", flow);
					void signIn("password-custom", formData)
						.catch((error) => {
							setError(error.message);
							setLoading(false);
						})
						.then(() => {
							router.push("/");
						});
				}}
			>
				<input
					className="rounded-lg border border-slate-300 bg-white p-3 text-foreground outline-none transition-all placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:focus:border-slate-400 dark:focus:ring-slate-700"
					type="email"
					name="email"
					placeholder="Email"
					required
				/>
				{flow === "signUp" && (
					// role select
					<select
						className="rounded-lg border border-slate-300 bg-white p-3 text-foreground outline-none transition-all placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:focus:border-slate-400 dark:focus:ring-slate-700"
						name="role"
						required
					>
						<option value="">Select Role</option>
						<option value="worker">Worker</option>
						<option value="company">Company</option>
						<option value="admin">Admin</option>
					</select>
				)}
				<div className="flex flex-col gap-1">
					<input
						className="rounded-lg border border-slate-300 bg-white p-3 text-foreground outline-none transition-all placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:focus:border-slate-400 dark:focus:ring-slate-700"
						type="password"
						name="password"
						placeholder="Password"
						minLength={8}
						required
					/>
					{flow === "signUp" && (
						<p className="px-1 text-slate-500 text-xs dark:text-slate-400">
							Password must be at least 8 characters
						</p>
					)}
				</div>
				<button
					className="cursor-pointer rounded-lg bg-slate-700 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-slate-600 dark:hover:bg-slate-500"
					type="submit"
					disabled={loading}
				>
					{loading ? "Loading..." : flow === "signIn" ? "Sign in" : "Sign up"}
				</button>
				<div className="flex flex-row justify-center gap-2 text-sm">
					<span className="text-slate-600 dark:text-slate-400">
						{flow === "signIn"
							? "Don't have an account?"
							: "Already have an account?"}
					</span>
					<button
						type="button"
						className="cursor-pointer font-medium text-slate-700 underline decoration-2 underline-offset-2 transition-colors hover:text-slate-900 hover:no-underline dark:text-slate-300 dark:hover:text-slate-100"
						onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
					>
						{flow === "signIn" ? "Sign up" : "Sign in"}
					</button>
				</div>
				{error && (
					<div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 dark:border-rose-500/50">
						<p className="break-words font-medium text-rose-700 text-sm dark:text-rose-300">
							Error: {error}
						</p>
					</div>
				)}
			</form>
		</div>
	);
}
