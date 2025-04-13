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
            <div className="flex items-center mb-8">
                <div className="h-1 w-10 bg-black rounded-full mr-4"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">スクリーンショット</h2>
            </div>

            {/* 新しいコンパクトなレイアウト */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* メイン画像 - 大きめに表示 */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-md mb-4 bg-gray-50">
                        <Image
                            src={screenshots[activeIndex].url}
                            alt={screenshots[activeIndex].caption || `スクリーンショット ${activeIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    {screenshots[activeIndex].caption && (
                        <div className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <p className="text-sm font-medium">{screenshots[activeIndex].caption}</p>
                        </div>
                    )}
                </div>

                {/* サムネイルグリッド - 小さめに表示 */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {screenshots.map((screenshot, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative aspect-video rounded-lg overflow-hidden border transition-all duration-200 ${activeIndex === index
                                    ? 'border-black shadow-md scale-105 z-10'
                                    : 'border-gray-200 opacity-80 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={screenshot.url}
                                    alt={screenshot.caption || `サムネイル ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className={`absolute inset-0 bg-black/10 backdrop-blur-[1px] transition-opacity duration-200 ${activeIndex === index ? 'opacity-0' : 'opacity-100'
                                    }`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 
