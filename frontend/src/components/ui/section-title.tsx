interface SectionTitleProps {
    children: React.ReactNode
    className?: string
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
    return (
        <h2 className={`text-2xl font-medium tracking-tight relative
      before:content-[''] before:absolute before:-bottom-4 before:left-0
      before:w-12 before:h-[2px] before:bg-black ${className}`}>
            {children}
        </h2>
    )
} 