import { Work } from '@/lib/types/work';
import { Calendar, Users, Github, ExternalLink, FileText } from 'lucide-react';

type Props = {
    work: Work;
};

export function ProjectInfo({ work }: Props) {
    return (
        <section className="mb-16">
            <div className="flex items-center mb-12">
                <div className="h-1 w-10 bg-black rounded-full mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">プロジェクト概要</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {work.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {work.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {work.links?.github && (
                            <a
                                href={work.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 hover:text-black transition-colors"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                ソースコード
                            </a>
                        )}
                        {work.links?.demo && (
                            <a
                                href={work.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 hover:text-black transition-colors"
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                デモを見る
                            </a>
                        )}
                        {work.links?.blog && (
                            <a
                                href={work.links.blog}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-700 hover:text-black transition-colors"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                関連記事
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">プロジェクト詳細</h3>

                        {work.duration && (
                            <div className="flex items-start mb-4">
                                <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">期間</p>
                                    <p className="text-gray-600">{work.duration}</p>
                                </div>
                            </div>
                        )}

                        {work.role && (
                            <div className="flex items-start mb-4">
                                <Users className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">役割</p>
                                    <p className="text-gray-600">{work.role}</p>
                                </div>
                            </div>
                        )}

                        {work.category && (
                            <div className="flex items-start">
                                <FileText className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">カテゴリー</p>
                                    <p className="text-gray-600">{work.category}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 
