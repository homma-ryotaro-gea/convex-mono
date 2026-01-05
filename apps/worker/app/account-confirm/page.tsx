"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccountConfirmPage = () => {
	const router = useRouter();
	const { signOut } = useAuthActions();
	const handleWorkerLogin = () => {
		void signOut().then(() => {
			router.push("/signin");
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			<div className="w-full max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-4 mb-6">
						<Image src="/convex.svg" alt="Convex Logo" width={48} height={48} />
					</div>
				</div>

				{/* Main Card */}
				<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
					{/* Warning Header */}
					<div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-6 py-4">
						<div className="flex items-start gap-4">
							<div className="flex-shrink-0 mt-1">
								<svg
									className="w-6 h-6 text-amber-600 dark:text-amber-400"
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
								<h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-1">
									アカウントタイプの不一致
								</h2>
								<p className="text-sm text-amber-800 dark:text-amber-300">
									現在ログインしているアカウントは企業用です。
									<br />
									このアカウントではワーカー用ダッシュボードにアクセスできません。
								</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="mb-6">
							<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
								ワーカー用ダッシュボードにアクセスするには、ワーカーアカウントでログインする必要があります。
								企業用ダッシュボードにアクセスする場合は、下記のリンクから開くことができます。
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-4">
							<Link
								href="http://localhost:4001"
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 group"
							>
								<div className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-medium rounded-lg px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
									<svg
										className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
							<Button onClick={handleWorkerLogin} variant="outline">
								<svg
									className="w-5 h-5"
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
								<span>ワーカー用ログイン画面に遷移する</span>
							</Button>
						</div>
					</div>

					{/* Footer Info */}
					<div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
						<div className="flex items-start gap-3">
							<svg
								className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5"
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
							<p className="text-xs text-slate-600 dark:text-slate-400">
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
