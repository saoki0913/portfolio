'use client'

import { useEffect, useState } from 'react'
import { getAboutInfo } from '@/lib/api/about'
import { About as AboutType } from '@/lib/types/about'

export const About = () => {
    const [aboutData, setAboutData] = useState<AboutType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAboutInfo()
                setAboutData(data)
            } catch (err) {
                console.error('About情報の取得に失敗しました:', err)
                setError('データの読み込みに失敗しました')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // ローディング中の表示
    if (loading) {
        return (
            <section id="about" className="mt-16 md:mt-20 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">About</h2>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 mb-6 rounded"></div>
                            <div className="h-6 bg-gray-200 mb-4 rounded"></div>
                            <div className="h-24 bg-gray-200 mb-6 rounded"></div>
                            <div className="h-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 mb-6 rounded"></div>
                            <div className="h-6 bg-gray-200 mb-4 rounded"></div>
                            <div className="h-24 bg-gray-200 mb-6 rounded"></div>
                            <div className="h-6 bg-gray-200 mb-4 rounded"></div>
                            <div className="h-24 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // エラー時の表示
    if (error || !aboutData) {
        return (
            <section id="about" className="mt-16 md:mt-20 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">About</h2>
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">エラーが発生しました</h3>
                        <p>{error || 'データを取得できませんでした'}</p>
                    </div>
                </div>
            </section>
        )
    }

    // 研究活動データの取得
    const research = aboutData.education.find(edu =>
        edu.institution.includes('早稲田大学') && edu.description?.includes('菅野研究室')
    )

    // 職務経験データの取得
    const workExperiences = aboutData.experience.sort((a, b) => {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    })

    return (
        <section id="about" className="mt-16 md:mt-20 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">About</h2>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <div>
                        <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 uppercase">研究活動</h3>
                        {research && (
                            <>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h4 className="text-lg md:text-xl font-medium">{research.institution} {research.description?.replace('菅野研究室', '')}</h4>
                                    <span className="text-base md:text-lg text-gray-600">
                                        {research.start_date} 〜 {research.end_date || '現在'}
                                    </span>
                                </div>
                                <p className="text-base md:text-lg leading-relaxed">
                                    {aboutData.education[0].description}
                                </p>
                            </>
                        )}
                        {!research && (
                            <p className="text-base md:text-lg leading-relaxed">研究活動データがありません</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 uppercase">職務経験</h3>
                        <div className="space-y-6 md:space-y-8">
                            {workExperiences.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                        <h4 className="text-lg md:text-xl font-medium">{exp.company}</h4>
                                        <span className="text-base md:text-lg text-gray-600">
                                            {exp.start_date} 〜 {exp.end_date || '現在'}
                                        </span>
                                    </div>
                                    <p className="text-base md:text-lg leading-relaxed mb-4">
                                        {exp.position && <strong>{exp.position}</strong>}
                                        {exp.position && exp.description && ' - '}
                                        {exp.description}
                                    </p>
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {exp.achievements.map((achievement, idx) => (
                                                <li key={idx} className="text-base">{achievement}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            {workExperiences.length === 0 && (
                                <p className="text-base md:text-lg leading-relaxed">職務経験データがありません</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 
