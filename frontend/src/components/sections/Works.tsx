import Link from 'next/link'

export const Works = () => {
    return (
        <section id="works" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">Works</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    <Link href="/works/portfolio" className="group">
                        <div className="aspect-[1/1] mb-4 md:mb-5 overflow-hidden rounded-lg">
                            <img
                                src="/works/portfolio.png"
                                alt="Portfolio"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-2">ポートフォリオ</h3>
                        <p className="text-sm text-gray-600">Next.js, TypeScript, Tailwind CSS</p>
                    </Link>

                    <Link href="/works/azure-rag" className="group">
                        <div className="aspect-[1/1] mb-4 md:mb-5 overflow-hidden rounded-lg">
                            <img
                                src="works/azure_rag.png"
                                alt="AI Chat System"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-2">Azure AIサービスを利用したRAG</h3>
                        <p className="text-sm text-gray-600">Azure OpenAI, Azure AI Search, Azure functions, Azure Static Web apps, Azure Cosmos DB, Microsoft Graph API, React, FastAPI, MUI,
                            TypeScript, Python
                        </p>
                    </Link>

                    <Link href="/works/schedule-management" className="group">
                        <div className="aspect-[1/1] mb-4 md:mb-5 overflow-hidden rounded-lg">
                            <img
                                src="/works/schedule_management.png"
                                alt="Schedule Management"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-lg md:text-xl font-medium mb-2">スケジュール管理アプリ</h3>
                        <p className="text-sm text-gray-600">Azure functions, Azure Static Web apps, Azure Cosmos DB, Microsoft Graph API, Next.js, FastAPI, Tailwind CSS</p>
                    </Link>
                </div>
            </div>
        </section>
    )
} 
