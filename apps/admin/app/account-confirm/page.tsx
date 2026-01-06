"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccountConfirmPage = () => {
	const router = useRouter();
	const { signOut } = useAuthActions();
	const handleAdminLogin = () => {
		void signOut().then(() => {
			router.push("/signin");
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8 dark:from-slate-900 dark:to-slate-800">
			<div className="w-full max-w-2xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="mb-6 flex items-center justify-center gap-4">
						<Image src="/convex.svg" alt="Convex Logo" width={48} height={48} />
					</div>
				</div>

				{/* Main Card */}
				<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
					{/* Warning Header */}
					<div className="border-amber-200 border-b bg-amber-50 px-6 py-4 dark:border-amber-800 dark:bg-amber-900/20">
						<div className="flex items-start gap-4">
							<div className="mt-1 flex-shrink-0">
								<svg
									className="h-6 w-6 text-amber-600 dark:text-amber-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-label="警告アイコン"
								>
									<title>警告アイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<div className="flex-1">
								<h2 className="mb-1 font-semibold text-amber-900 text-lg dark:text-amber-200">
									アカウントタイプの不一致
								</h2>
								<p className="text-amber-800 text-sm dark:text-amber-300">
									現在ログインしているアカウントは企業またはワーカー用です。
									<br />
									このアカウントでは管理画面にアクセスできません。
								</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="mb-6">
							<p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400">
								管理画面にアクセスするには、管理アカウントでログインする必要があります。
								企業用またはワーカー用ダッシュボードにアクセスする場合は、下記のリンクから開くことができます。
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-4">
							<Link
								href="http://localhost:3001"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex-1"
							>
								<div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-4 font-medium text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:shadow-lg dark:bg-slate-600 dark:hover:bg-slate-500">
									<svg
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
										aria-label="外部リンクアイコン"
									>
										<title>外部リンクアイコン</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									<span>企業用ダッシュボードを開く</span>
								</div>
							</Link>
							<Link
								href="http://localhost:3001"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex-1"
							>
								<div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-4 font-medium text-white shadow-md transition-all duration-200 hover:bg-slate-800 hover:shadow-lg dark:bg-slate-600 dark:hover:bg-slate-500">
									<svg
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
										aria-label="外部リンクアイコン"
									>
										<title>外部リンクアイコン</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									<span>ワーカー用ダッシュボードを開く</span>
								</div>
							</Link>
							<button
								type="button"
								onClick={handleAdminLogin}
								className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-6 py-4 font-medium text-slate-800 shadow-md transition-all duration-200 hover:bg-slate-200 hover:shadow-lg dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
							>
								<svg
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									aria-label="ログアウトアイコン"
								>
									<title>ログアウトアイコン</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								<span>運営ログイン画面に遷移する</span>
							</button>
						</div>
					</div>

					{/* Footer Info */}
					<div className="border-slate-200 border-t bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-900/50">
						<div className="flex items-start gap-3">
							<svg
								className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
								aria-label="情報アイコン"
							>
								<title>情報アイコン</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<p className="text-slate-600 text-xs dark:text-slate-400">
								異なるアカウントタイプでログインするには、一度ログアウトしてから適切なアカウントで再度ログインしてください。
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountConfirmPage;
