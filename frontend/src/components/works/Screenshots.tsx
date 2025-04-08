import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Work } from '@/lib/types/work';
import { ZoomIn } from 'lucide-react';

type Props = {
    work: Work;
};

export function Screenshots({ work }: Props) {
    return (
        <section className="mb-24">
            <div className="flex items-center mb-12">
                <div className="h-1 w-10 bg-gray-500 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-gray-900">スクリーンショット</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {work.images.map((image, index) => (
                    <Card
                        key={index}
                        className="group overflow-hidden cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-0"
                    >
                        <div className="relative aspect-video">
                            <Image
                                src={image}
                                alt={`${work.title}のスクリーンショット ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn className="w-5 h-5 text-gray-700" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/4"></div>
                            <div className="absolute bottom-4 left-4 text-white font-medium">
                                スクリーンショット {index + 1}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
} 
