import { Work } from '@/lib/types/work';
import { Calendar, Users, Github, ExternalLink, FileText } from 'lucide-react';

type Props = {
    work: Work;
};

export function ProjectInfo({ work }: Props) {
    return (
        <section className="mb-16">
            <div className="flex items-center mb-12">
                <div className="h-1 w-10 bg-black dark:bg-white rounded-full mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100 tracking-tight">プロジェクト概要</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <p className="text-lg text-gray-700 dark:text-neutral-300 leading-relaxed mb-8">
                        {work.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {work.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {work.github_link && (
                            <a
                                href={work.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                ソースコード
                            </a>
                        )}
                        {work.demo_link && (
                            <a
                                href={work.demo_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                デモを見る
                            </a>
                        )}
                        {work.blog_link && (
                            <a
                                href={work.blog_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                関連記事
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-neutral-100">プロジェクト詳細</h3>

                        {work.duration && (
                            <div className="flex items-start mb-4">
                                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">期間</p>
                                    <p className="text-gray-600 dark:text-neutral-400">{work.duration}</p>
                                </div>
                            </div>
                        )}

                        {work.role && (
                            <div className="flex items-start mb-4">
                                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">役割</p>
                                    <p className="text-gray-600 dark:text-neutral-400">{work.role}</p>
                                </div>
                            </div>
                        )}

                        {work.category && (
                            <div className="flex items-start">
                                <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">カテゴリー</p>
                                    <p className="text-gray-600 dark:text-neutral-400">{work.category}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 
