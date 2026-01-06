"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const user = useQuery(api.myFunctions.getUser);

	useEffect(() => {
		if (user && user.role !== "admin") {
			router.push("/account-confirm");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	return (
		<>
			<header className="sticky top-0 z-10 flex flex-row items-center justify-between border-slate-200 border-b bg-background/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-700">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-3">
						<Image src="/convex.svg" alt="Convex Logo" width={32} height={32} />
					</div>
					<h1 className="font-semibold text-slate-800 dark:text-slate-200">
						Admin Dashboard
					</h1>
				</div>
				<SignOutButton />
			</header>
			<main className="flex flex-col gap-8 p-8">
				<Content />
			</main>
		</>
	);
}

function SignOutButton() {
	const { isAuthenticated } = useConvexAuth();
	const { signOut } = useAuthActions();
	const router = useRouter();
	return (
		<>
			{isAuthenticated && (
				<button
					type="button"
					className="cursor-pointer rounded-lg bg-slate-600 px-4 py-2 font-medium text-sm text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md dark:bg-slate-700 dark:hover:bg-slate-600"
					onClick={() =>
						void signOut().then(() => {
							setTimeout(() => {
								router.push("/signin");
							}, 1000);
						})
					}
				>
					Sign out
				</button>
			)}
		</>
	);
}

function Content() {
	const { viewer, numbers } =
		useQuery(api.myFunctions.listNumbers, {
			count: 10,
		}) ?? {};
	const addNumber = useMutation(api.myFunctions.addNumber);

	if (viewer === undefined || numbers === undefined) {
		return (
			<div className="mx-auto">
				<div className="flex items-center gap-2">
					<div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
					<div
						className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
						style={{ animationDelay: "0.1s" }}
					/>
					<div
						className="h-2 w-2 animate-bounce rounded-full bg-slate-600"
						style={{ animationDelay: "0.2s" }}
					/>
					<p className="ml-2 text-slate-600 dark:text-slate-400">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4">
			<div>
				<h2 className="font-bold text-slate-800 text-xl dark:text-slate-200">
					Welcome {viewer ?? "Anonymous"}!
				</h2>
				<p className="mt-2 text-slate-600 dark:text-slate-400">
					You are signed into a demo application using Convex Auth.
				</p>
				<p className="mt-1 text-slate-600 dark:text-slate-400">
					This app can generate random numbers and store them in your Convex
					database.
				</p>
			</div>

			<div className="h-px bg-slate-200 dark:bg-slate-700" />

			<div className="flex flex-col gap-4">
				<h2 className="font-semibold text-slate-800 text-xl dark:text-slate-200">
					Number generator
				</h2>
				<p className="text-slate-600 text-sm dark:text-slate-400">
					Click the button below to generate a new number. The data is persisted
					in the Convex cloud database - open this page in another window and
					see the data sync automatically!
				</p>
				<button
					type="button"
					className="cursor-pointer rounded-lg bg-slate-700 px-6 py-3 font-medium text-sm text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] dark:bg-slate-600 dark:hover:bg-slate-500"
					onClick={() => {
						void addNumber({ value: Math.floor(Math.random() * 10) });
					}}
				>
					+ Generate random number
				</button>
				<div className="rounded-xl border border-slate-300 bg-slate-100 p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800">
					<p className="mb-2 font-semibold text-slate-800 dark:text-slate-200">
						Newest Numbers
					</p>
					<p className="font-mono text-lg text-slate-700 dark:text-slate-300">
						{numbers?.length === 0
							? "Click the button to generate a number!"
							: (numbers?.join(", ") ?? "...")}
					</p>
				</div>
			</div>

			<div className="h-px bg-slate-200 dark:bg-slate-700" />

			<div className="flex flex-col gap-4">
				<h2 className="font-semibold text-slate-800 text-xl dark:text-slate-200">
					Making changes
				</h2>
				<p className="text-slate-600 text-sm dark:text-slate-400">
					Edit{" "}
					<code className="rounded-md border border-slate-300 bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
						convex/myFunctions.ts
					</code>{" "}
					to change the backend.
				</p>
				<p className="text-slate-600 text-sm dark:text-slate-400">
					Edit{" "}
					<code className="rounded-md border border-slate-300 bg-slate-200 px-2 py-1 font-mono font-semibold text-slate-700 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">
						app/page.tsx
					</code>{" "}
					to change the frontend.
				</p>
				<p className="text-slate-600 text-sm dark:text-slate-400">
					See the{" "}
					<Link
						href="/server"
						className="font-medium text-slate-700 underline decoration-2 underline-offset-2 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
					>
						/server route
					</Link>{" "}
					for an example of loading data in a server component
				</p>
			</div>

			<div className="h-px bg-slate-200 dark:bg-slate-700" />

			<div className="flex flex-col gap-4">
				<h2 className="font-bold text-slate-800 text-xl dark:text-slate-200">
					Useful resources
				</h2>
				<div className="flex gap-4">
					<div className="flex w-1/2 flex-col gap-4">
						<ResourceCard
							title="Convex docs"
							description="Read comprehensive documentation for all Convex features."
							href="https://docs.convex.dev/home"
						/>
						<ResourceCard
							title="Stack articles"
							description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
							href="https://stack.convex.dev"
						/>
					</div>
					<div className="flex w-1/2 flex-col gap-4">
						<ResourceCard
							title="Templates"
							description="Browse our collection of templates to get started quickly."
							href="https://www.convex.dev/templates"
						/>
						<ResourceCard
							title="Discord"
							description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
							href="https://www.convex.dev/community"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function ResourceCard({
	title,
	description,
	href,
}: {
	title: string;
	description: string;
	href: string;
}) {
	return (
		<a
			href={href}
			className="group flex h-36 cursor-pointer flex-col gap-2 overflow-auto rounded-xl border border-slate-300 bg-slate-100 p-5 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-slate-400 hover:bg-slate-200 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-500 dark:hover:bg-slate-700"
			target="_blank"
			rel="noreferrer"
		>
			<h3 className="font-semibold text-slate-700 text-sm transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
				{title} →
			</h3>
			<p className="text-slate-600 text-xs dark:text-slate-400">
				{description}
			</p>
		</a>
	);
}
