import { TechIcon } from "@/components/works/TechIcon";

export const Skills = () => {
    return (
        <section id="skills" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">Skills</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                    <div>
                        <h3 className="text-lg md:text-xl font-medium mb-6 md:mb-8 uppercase">プログラミング言語</h3>
                        <ul className="space-y-4 md:space-y-6">
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="Python" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Python
                                    </span>
                                    <span className="text-sm md:text-base">90%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[90%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="JavaScript" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        JavaScript
                                    </span>
                                    <span className="text-sm md:text-base">70%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[70%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="TypeScript" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        TypeScript
                                    </span>
                                    <span className="text-sm md:text-base">60%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[60%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="C" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        C言語
                                    </span>
                                    <span className="text-sm md:text-base">30%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[30%]"></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg md:text-xl font-medium mb-6 md:mb-8 uppercase">フレームワーク</h3>
                        <ul className="space-y-4 md:space-y-6">
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="PyTorch" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        PyTorch
                                    </span>
                                    <span className="text-sm md:text-base">80%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[80%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="FastAPI" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        FastAPI
                                    </span>
                                    <span className="text-sm md:text-base">80%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[80%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="React" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        React
                                    </span>
                                    <span className="text-sm md:text-base">70%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[70%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="Next.js" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Next.js
                                    </span>
                                    <span className="text-sm md:text-base">60%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[60%]"></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg md:text-xl font-medium mb-6 md:mb-8 uppercase">その他</h3>
                        <ul className="space-y-4 md:space-y-6">
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="GitHub" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Git/GitHub
                                    </span>
                                    <span className="text-sm md:text-base">80%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[80%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="Docker" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Docker
                                    </span>
                                    <span className="text-sm md:text-base">60%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[60%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="Azure" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Azure
                                    </span>
                                    <span className="text-sm md:text-base">80%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[80%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="AWS" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        AWS
                                    </span>
                                    <span className="text-sm md:text-base">50%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[50%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="Linux" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        Linux
                                    </span>
                                    <span className="text-sm md:text-base">70%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[70%]"></div>
                                </div>
                            </li>
                            <li>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm md:text-base flex items-center">
                                        <TechIcon tech="ROS" className="w-5 h-5 inline-block mr-2 text-gray-700" />
                                        ROS
                                    </span>
                                    <span className="text-sm md:text-base">70%</span>
                                </div>
                                <div className="h-[1px] w-full bg-gray-200">
                                    <div className="h-full bg-black w-[70%]"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
} 
