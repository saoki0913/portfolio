import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SectionTitle } from '@/components/ui/section-title'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectDetailLayoutProps {
    title: string
    description: string
    technologies: string[]
    imageUrl: string
    githubUrl: string
    demoUrl: string
    demoLabel?: string
    children: React.ReactNode
}

export function ProjectDetailLayout({
    title,
    description,
    technologies,
    imageUrl,
    githubUrl,
    demoUrl,
    demoLabel = 'デモを見る',
    children
}: ProjectDetailLayoutProps) {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="h-[70vh] relative flex items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-4xl px-6 py-20">
                <div className="flex justify-between items-center mb-16">
                    <Link href="/#works">
                        <Button variant="ghost" className="group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            戻る
                        </Button>
                    </Link>
                    <div className="flex gap-4">
                        <Link href={githubUrl} target="_blank">
                            <Button variant="outline" className="gap-2">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </Button>
                        </Link>
                        <Link href={demoUrl} target="_blank">
                            <Button className="gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                {demoLabel}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none">
                    {children}
                </div>
            </div>
        </main>
    )
} 