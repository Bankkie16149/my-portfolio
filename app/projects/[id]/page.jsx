'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaGlobe, FaArrowLeft, FaFigma } from 'react-icons/fa'
import { useLanguage } from '@/app/context/LanguageContext'
import DetailLayout from '@/app/components/DetailLayout'
import Navbar from '@/app/components/Navbar'
import { projectsData } from '@/app/data/portfolio'

export default function ProjectDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    if (id) {
      const data = projectsData.find(p => p.id === id || p.id.toString() === id);
      if (!data) {
        router.push('/');
        return;
      }
      setProject(data);
      setLoading(false);
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-zinc-950">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!project) return null

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pt-6 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <FaArrowLeft />
            {language === 'th' ? 'กลับ' : 'Back'}
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
          {/* IMAGE SECTION */}
          {project.imageUrl && (
            <div className="w-full p-6 md:p-8 pb-0">
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-md">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          )}
          
          <div className="p-8 md:p-12">
            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {project.title}
            </h1>
            
            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags && project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-light whitespace-pre-wrap">
              {project.description}
            </p>

            {/* LINKS */}
            <div className="flex flex-wrap gap-4 mb-16 border-b border-gray-100 dark:border-zinc-800 pb-12">
              {project.projectUrl && (
                <Link
                  href={project.projectUrl}
                  target="_blank"
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1"
                >
                  <FaGlobe className="text-xl group-hover:rotate-12 transition-transform" />
                  <span className="font-bold">{language === 'th' ? 'เยี่ยมชมเว็บไซต์' : 'Visit Website'}</span>
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="group flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-all shadow-xl shadow-gray-900/20 dark:shadow-white/20 hover:shadow-gray-900/40 hover:-translate-y-1"
                >
                  <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-bold">GitHub Repository</span>
                </Link>
              )}
            </div>

            {/* SECTIONS FROM PROJECT.CONTENT */}
            {!isEditing && project.content && (() => {
              try {
                const projectData = JSON.parse(project.content);
                if (projectData && projectData.length > 0) {
                  return (
                    <div className="mt-8 space-y-24 md:space-y-32">
                      {projectData.map((section, index) => (
                        <DetailLayout
                          key={section.id || index}
                          index={index}
                          title={language === 'th' && section.titleTh ? section.titleTh : section.title}
                          subtitle={language === 'th' ? section.subtitle : section.subtitleEn}
                          imageSrc={section.imageSrc}
                          imageAlt={section.title}
                        >
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {language === 'th' ? section.contentTitle : section.contentTitleEn}
                          </h3>
                          <p className="mb-8 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {language === 'th' ? section.description : section.descriptionEn}
                          </p>
                          {section.figmaLink && (
                            <div className="flex mt-8">
                              <a
                                href={section.figmaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-8 py-4 bg-[#F24E1E] hover:bg-[#E03E0E] text-white rounded-2xl transition-all shadow-xl shadow-[#F24E1E]/30 hover:shadow-[#F24E1E]/50 hover:-translate-y-1"
                              >
                                <FaFigma className="text-xl group-hover:scale-110 transition-transform" />
                                <span className="font-bold tracking-wide">View in Figma</span>
                              </a>
                            </div>
                          )}
                        </DetailLayout>
                      ))}
                    </div>
                  );
                }
              } catch (e) {
                console.error("Error parsing project.content", e);
              }
              return null;
            })()}

          </div>
        </div>
      </div>
    </div>
    </>
  )
}
