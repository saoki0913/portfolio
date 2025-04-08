import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Code2 } from 'lucide-react';
import { Work } from '@/lib/types/work';

type Props = {
    work: Work;
};

export function ProjectInfo({ work }: Props) {
    return (
        <div className="relative">
            {/* 背景装飾要素 */}
            <div className="absolute top-10 right-0 w-1/3 h-1/2 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl -z-10 opacity-70 blur-3xl"></div>
            <div className="absolute bottom-10 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full -z-10 opacity-60 blur-3xl"></div>

            <div className="grid md:grid-cols-2 gap-10 mb-24">
                <div className="space-y-10">
                    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <CardTitle className="flex items-center text-xl text-gray-800">
                                <User className="w-5 h-5 mr-2 text-gray-600" />
                                プロジェクト概要
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex items-start group">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-4 shrink-0 group-hover:bg-gray-100 transition-colors">
                                    <Calendar className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-800 mb-1">期間</dt>
                                    <dd className="text-gray-600">{work.period}</dd>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-4 shrink-0 group-hover:bg-gray-100 transition-colors">
                                    <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-800 mb-1">役割</dt>
                                    <dd className="text-gray-600">{work.role}</dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <CardTitle className="flex items-center text-xl text-gray-800">
                                <Code2 className="w-5 h-5 mr-2 text-gray-600" />
                                使用技術
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-2">
                                {work.technologies.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="secondary"
                                        className="bg-gray-50 text-gray-700 hover:bg-gray-100 py-1.5 px-3 shadow-sm"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="border-b border-gray-100 pb-4">
                        <CardTitle className="text-xl text-gray-800">主な機能</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-8">
                            {work.features.map((feature, index) => (
                                <div key={feature} className="flex items-start group">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 shrink-0 group-hover:bg-gray-200 transition-colors text-gray-800 font-medium shadow-sm">
                                        {index + 1}
                                    </div>
                                    <div className="pt-1.5">
                                        <p className="text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 
