import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, ExternalLink } from 'lucide-react';
import { HeroSection } from '@/components/works/HeroSection';
import { ProjectInfo } from '@/components/works/ProjectInfo';
import { Screenshots } from '@/components/works/Screenshots';
import { TechIcon } from '@/components/works/TechIcon';
import { getWorkById, getAllWorks } from '@/lib/api/works';

type Props = {
    params: {
        id: string;
    };
};

export async function generateStaticParams() {
    try {
        const works = await getAllWorks();
        return works.map((work) => ({
            id: work.id,
        }));
    } catch (error) {
        console.error('Error fetching works for static paths:', error);
        return [];
    }
}

export default async function WorkPage({ params }: Props) {
    let work;
    const resolvedParams = await Promise.resolve(params);
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
        <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
            {/*背景装飾 */}
            <div className="fixed inset-0 -z-10 bg-[url('/patterns/grid.svg')] bg-fixed opacity-[0.02]" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_80%)]" />
            <div className="fixed inset-0 -z-10 bg-[url('/patterns/circuit-board.svg')] bg-fixed bg-[length:300px_300px] opacity-10 mix-blend-soft-light" />

            <HeroSection work={work} />

            <div className="container mx-auto px-4 py-16 md:py-24">
                {/* 戻るボタン */}
                <Link
                    href="/#works"
                    className="inline-flex items-center text-gray-600 hover:text-black mb-16 group transition-colors font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    プロジェクト一覧に戻る
                </Link>

                {/* プロジェクト情報 */}
                <div className="relative">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100/80 to-white/40 rounded-2xl blur-xl" />
                    <ProjectInfo work={work} />
                </div>

                {/* スクリーンショット */}
                {work.screenshots && work.screenshots.length > 0 && (
                    <div className="mt-16 mb-16 relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="absolute -inset-10 bg-gradient-to-b from-gray-100/0 via-gray-100/60 to-gray-100/0 -z-10 blur-3xl" />
                        <Screenshots work={work} />
                    </div>
                )}

                {/* 技術スタック */}
                <section className="relative mb-28 mt-16 py-16">
                    <div className="absolute -top-20 -left-10 w-72 h-72 bg-gradient-to-tr from-gray-200/50 to-white/5 rounded-full mix-blend-multiply opacity-70 blur-3xl -z-10" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-gray-200/50 to-white/5 rounded-full mix-blend-multiply opacity-60 blur-3xl -z-10" />

                    <div className="flex items-center mb-12">
                        <div className="h-1 w-10 bg-black rounded-full mr-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">技術スタック</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                        {work.technologies.map((tech, index) => (
                            <div
                                key={tech}
                                className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 animate-fadeInUp"
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animationFillMode: 'both',
                                }}
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow">
                                    <TechIcon tech={tech} className="w-7 h-7" />
                                </div>
                                <span className="text-gray-800 font-medium group-hover:text-black transition-colors">{tech}</span>
                                <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-black/60 to-gray-600/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-xl" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 学んだこと*/}
                {work.learnings && (
                    <section className="border-t border-gray-200 pt-16 mb-20 relative">
                        <div className="absolute left-1/2 top-0 w-96 h-96 -translate-x-1/2 bg-gradient-to-b from-gray-100/50 to-transparent rounded-full mix-blend-multiply opacity-60 blur-3xl -z-10" />

                        <div className="flex items-center mb-12">
                            <div className="h-1 w-10 bg-black rounded-full mr-4" />
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center">
                                <GraduationCap className="w-8 h-8 mr-3 text-black" />
                                学んだこと
                            </h2>
                        </div>
                        <div className="prose prose-lg max-w-none prose-gray bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                                {work.learnings}
                            </p>
                        </div>
                    </section>
                )}

                {/* フッターナビゲーション */}
                <div className="mt-28 pt-10 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <Link
                            href="/#works"
                            className="mb-6 sm:mb-0 inline-flex items-center text-gray-600 hover:text-black group transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            他のプロジェクトを見る
                        </Link>
                        {work.links?.demo && (
                            <a
                                href={work.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg font-medium"
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
