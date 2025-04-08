import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
    title: string
    description: string
    technologies: string[]
    githubUrl: string
    imageUrl: string
    projectUrl: string
}

export function ProjectCard({
    title,
    description,
    technologies,
    githubUrl,
    imageUrl,
    projectUrl,
}: ProjectCardProps) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 w-full group">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Link href={githubUrl} target="_blank" className="flex-1">
                    <Button variant="outline" className="w-full">
                        GitHub
                    </Button>
                </Link>
                <Link href={projectUrl} target="_blank" className="flex-1">
                    <Button className="w-full">
                        View Project
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
} 