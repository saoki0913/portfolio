'use client'

import { useEffect, useState } from 'react'
import { getAboutInfo } from '@/lib/api/about'
import { AboutResponse } from '@/lib/types/about'

export const About = () => {
    const [aboutData, setAboutData] = useState<AboutResponse | null>(null)
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
            <section id="about" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
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
            <section id="about" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
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
        <section id="about" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">About</h2>

                {/* プロフィール概要 */}
                <div className="w-full mb-12 md:mb-16">
                    <p className="text-lg md:text-xl leading-8 px-2.5">
                        早稲田大学創造理工学研究科の修士1年生として、菅野研究室で「人とロボットの共生」をテーマに研究を行っています。深層予測学習を用いた双腕ヒューマノイドロボットの動作生成に関する研究に取り組み、限られた動作教示から柔軟な動作を生成する技術の開発に注力しています。また、企業では主にAzureを活用したWebアプリ開発やRAGシステムの構築に携わっています。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                    {/* 研究活動 */}
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 uppercase leading-8">研究活動</h3>
                        <div className="space-y-4">
                            <p className="text-base md:text-lg leading-relaxed">
                                人とロボットが共生する社会の実現に向け、深層学習を用いた双腕ロボットの動作生成研究に取り組んでいます。
                            </p>
                            <p className="text-base md:text-lg leading-relaxed">
                                少子高齢化や人手不足が深刻化する中、ロボットが人の代わりに柔軟に作業できる技術基盤が必要です。特に、物体と接触しながら手先位置の相対関係が変化する「部分拘束協調作業」に着目しました。
                            </p>
                            <p className="text-base md:text-lg leading-relaxed">
                                人間の脳が左右の情報を統合する仕組みを参考に、階層型深層予測学習モデル（HLSTM）を採用。下位層で左右各腕を個別に学習し、上位層で協調パターンを統合することで、ノイズに強く安定した協調動作の生成を実現しました。
                            </p>
                            <p className="text-base md:text-lg leading-relaxed">
                                この研究成果は、介護支援ロボットや家庭用ロボットの実用化を通じて、介護従事者の負担軽減や高齢者の自立支援への貢献が期待されます。今後はタオルたたみや箱詰めなど他の双腕タスクへ応用を進め、人とロボットが共生する社会実現に貢献していきます。
                            </p>
                        </div>
                    </div>

                    {/* 職務経験 */}
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 uppercase">職務経験</h3>
                        <div className="space-y-8">
                            {workExperiences.map((exp, index) => (
                                <div key={index} className="mb-8 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <h4 className="text-lg md:text-xl font-medium">{exp.company}</h4>
                                            <span className="text-sm md:text-base text-gray-600 mt-1 md:mt-0">
                                                {exp.start_date} 〜 {exp.end_date || '現在'}
                                            </span>
                                        </div>
                                        <p className="font-medium text-gray-700 mt-1">
                                            {exp.position}
                                        </p>
                                    </div>
                                    <p className="text-base md:text-lg leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="mt-3">
                                            <h5 className="text-sm uppercase tracking-wider text-gray-600 mb-2">成果・実績</h5>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {exp.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="text-base text-gray-700">
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {workExperiences.length === 0 && (
                                <p className="text-base md:text-lg leading-relaxed text-gray-500 italic">職務経験データがありません</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 
