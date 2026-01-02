import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, ExternalLink } from 'lucide-react';
import { HeroSection } from '@/components/works/HeroSection';
import { ProjectInfo } from '@/components/works/ProjectInfo';
import { Screenshots } from '@/components/works/Screenshots';
import { TechIcon } from '@/components/works/TechIcon';
import { getWorkById } from '@/lib/api/works';

// 動的レンダリングを強制（ビルド時のAPI接続エラーを回避）
export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

// generateStaticParamsを削除（dynamic='force-dynamic'のため不要）

export default async function WorkPage({ params }: Props) {
    let work;
    const resolvedParams = await params;
    const id = resolvedParams.id;

    try {
        work = await getWorkById(id);
    } catch (error) {
        console.error(`Error fetching work with ID ${id}:`, error);
        notFound();
    }

    if (!work) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-300">
            {/*背景装飾 */}
            <div className="fixed inset-0 -z-10 bg-[url('/patterns/grid.svg')] bg-fixed opacity-[0.02] dark:opacity-[0.05]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_80%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_80%)]" />
            <div className="fixed inset-0 -z-10 bg-[url('/patterns/circuit-board.svg')] bg-fixed bg-[length:300px_300px] opacity-10 dark:opacity-5 mix-blend-soft-light" />

            <HeroSection work={work} />

            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* 戻るボタン */}
                <Link
                    href="/#works"
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-16 group transition-colors font-medium bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100 dark:border-neutral-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    プロジェクト一覧に戻る
                </Link>

                {/* プロジェクト情報 */}
                <div className="relative">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100/80 to-white/40 dark:from-neutral-800/80 dark:to-neutral-900/40 rounded-2xl blur-xl" />
                    <ProjectInfo work={work} />
                </div>

                {/* スクリーンショット */}
                {work.screenshots && Object.keys(work.screenshots).length > 0 && (
                    <div className="mt-16 mb-16 relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 shadow-sm">
                        <div className="absolute -inset-10 bg-gradient-to-b from-gray-100/0 via-gray-100/60 to-gray-100/0 dark:from-neutral-800/0 dark:via-neutral-800/60 dark:to-neutral-800/0 -z-10 blur-3xl" />
                        <Screenshots work={work} />
                    </div>
                )}

                {/* 技術スタック */}
                <section className="relative mb-28 mt-16 py-16">
                    <div className="absolute -top-20 -left-10 w-72 h-72 bg-gradient-to-tr from-gray-200/50 to-white/5 dark:from-neutral-700/50 dark:to-neutral-900/5 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70 blur-3xl -z-10" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-gray-200/50 to-white/5 dark:from-neutral-700/50 dark:to-neutral-900/5 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-60 blur-3xl -z-10" />

                    <div className="flex items-center mb-12">
                        <div className="h-1 w-10 bg-black dark:bg-white rounded-full mr-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100 tracking-tight">技術スタック</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                        {work.technologies.map((tech, index) => (
                            <div
                                key={tech}
                                className="group relative bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-neutral-700 hover:border-gray-200 dark:hover:border-neutral-600 transition-all duration-500 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 animate-fadeInUp"
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animationFillMode: 'both',
                                }}
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-neutral-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow">
                                    <TechIcon tech={tech} className="w-7 h-7" />
                                </div>
                                <span className="text-gray-800 dark:text-neutral-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{tech}</span>
                                <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-black/60 to-gray-600/60 dark:from-white/60 dark:to-gray-400/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-xl" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 学んだこと*/}
                {work.learnings && (
                    <section className="border-t border-gray-200 dark:border-neutral-700 pt-16 mb-20 relative">
                        <div className="absolute left-1/2 top-0 w-96 h-96 -translate-x-1/2 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-neutral-700/50 dark:to-transparent rounded-full mix-blend-multiply dark:mix-blend-screen opacity-60 blur-3xl -z-10" />

                        <div className="flex items-center mb-12">
                            <div className="h-1 w-10 bg-black dark:bg-white rounded-full mr-4" />
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100 tracking-tight flex items-center">
                                <GraduationCap className="w-8 h-8 mr-3 text-black dark:text-white" />
                                学んだこと
                            </h2>
                        </div>
                        <div className="prose prose-lg max-w-none prose-gray dark:prose-invert bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                            <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">
                                {work.learnings}
                            </p>
                        </div>
                    </section>
                )}

                {/* フッターナビゲーション */}
                <div className="mt-28 pt-10 border-t border-gray-200 dark:border-neutral-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <Link
                            href="/#works"
                            className="mb-6 sm:mb-0 inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white group transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            他のプロジェクトを見る
                        </Link>
                        {work.demo_link && (
                            <a
                                href={work.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md hover:shadow-lg font-medium"
                            >
                                デモを確認する
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
} 
