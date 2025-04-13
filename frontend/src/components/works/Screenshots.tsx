"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Work } from '@/lib/types/work';

type Props = {
    work: Work;
};

export function Screenshots({ work }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!work.screenshots || work.screenshots.length === 0) {
        return null;
    }

    const screenshots = work.screenshots;

    return (
        <section>
            <div className="flex items-center mb-12">
                <div className="h-1 w-10 bg-black rounded-full mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">スクリーンショット</h2>
            </div>

            <div>
                {/* メインの大きな画像 */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-md mb-4">
                    <Image
                        src={screenshots[activeIndex].url}
                        alt={screenshots[activeIndex].caption || `スクリーンショット ${activeIndex + 1}`}
                        fill
                        className="object-cover"
                    />
                    {screenshots[activeIndex].caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-4">
                            <p className="text-sm md:text-base">{screenshots[activeIndex].caption}</p>
                        </div>
                    )}
                </div>

                {/* サムネイルギャラリー */}
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
                    {screenshots.map((screenshot, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeIndex === index
                                ? 'border-black shadow-md scale-105 z-10'
                                : 'border-gray-200 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={screenshot.url}
                                alt={screenshot.caption || `サムネイル ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
} 
