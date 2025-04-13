"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from 'lucide-react';
import { Work } from '@/lib/types/work';

type Props = {
    work: Work;
};

export function HeroSection({ work }: Props) {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover grayscale contrast-125"
                priority
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 opacity-5 bg-[url('/patterns/circuit-board.svg')]"></div>
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 mix-blend-overlay blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/5 mix-blend-overlay blur-2xl"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8 max-w-4xl border border-white/10 backdrop-blur-sm bg-black/30 py-12 rounded-sm">
                    <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white animate-fade-in tracking-tight">
                        {work.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto animate-fade-in-up leading-relaxed mb-12">
                        {work.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        {work.links?.github && (
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-transparent backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                                onClick={() => work.links?.github && window.open(work.links.github, '_blank')}
                            >
                                <Github className="w-5 h-5 mr-2" />
                                GitHub
                            </Button>
                        )}
                        {work.links?.demo && (
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white text-black hover:bg-transparent hover:text-white hover:border-white/30 transition-all duration-300 rounded-sm"
                                onClick={() => work.links?.demo && window.open(work.links.demo, '_blank')}
                            >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                デモを見る
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
    );
} 
