import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillCategories } from '../data/skills';
import { ChipData } from '../lib/types';

interface CategorizedSkillsProps {
  className?: string;
}


export default function CategorizedSkills({ className = '' }: CategorizedSkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Bento Grid View - 2 Rows: First (2 cols), Second (3 cols) */}
      <div className="hidden md:block md:space-y-4 w-full">
        {/* First row - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 h-full min-h-[180px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            <div className="relative p-4 h-full flex flex-col">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Frontend
              </h4>
              <div className="flex-1 flex flex-wrap gap-3 content-start overflow-y-auto custom-scrollbar p-1">
                {skillCategories.Frontend.map((skill: ChipData, index: number) => (
                  <motion.div
                    key={index}
                    className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                      <skill.icon className="w-4 h-4" />
                      <span className="font-medium">{skill.chipName}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 h-full min-h-[180px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            <div className="relative p-4 h-full flex flex-col">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Backend
              </h4>
              <div className="flex-1 flex flex-wrap gap-3 content-start overflow-y-auto custom-scrollbar p-1">
                {skillCategories.Backend.map((skill: ChipData, index: number) => (
                  <motion.div
                    key={index}
                    className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                      <skill.icon className="w-4 h-4" />
                      <span className="font-medium">{skill.chipName}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second row - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 h-full min-h-[160px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            <div className="relative p-4 h-full flex flex-col">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Database
              </h4>
              <div className="flex-1 flex flex-wrap gap-3 content-start overflow-y-auto custom-scrollbar p-1">
                {skillCategories.Database.map((skill: ChipData, index: number) => (
                  <motion.div
                    key={index}
                    className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                      <skill.icon className="w-4 h-4" />
                      <span className="font-medium">{skill.chipName}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 h-full min-h-[160px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            <div className="relative p-4 h-full flex flex-col">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Messaging & Streaming
              </h4>
              <div className="flex-1 flex flex-wrap gap-3 content-start overflow-y-auto custom-scrollbar p-1">
                {skillCategories['Messaging & Streaming'].map((skill: ChipData, index: number) => (
                  <motion.div
                    key={index}
                    className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                      <skill.icon className="w-4 h-4" />
                      <span className="font-medium">{skill.chipName}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-gray-700/30 h-full min-h-[160px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            <div className="relative p-4 h-full flex flex-col">
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">
                Testing
              </h4>
              <div className="flex-1 flex flex-wrap gap-3 content-start overflow-y-auto custom-scrollbar p-1">
                {skillCategories.Testing.map((skill: ChipData, index: number) => (
                  <motion.div
                    key={index}
                    className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                      <skill.icon className="w-4 h-4" />
                      <span className="font-medium">{skill.chipName}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Accordion View with Frosted Glass */}
      <div className="md:hidden space-y-4">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <motion.div
            key={category}
            className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Frosted glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-100/5 pointer-events-none" />
            
            <button
              onClick={() => toggleCategory(category)}
              className="relative w-full px-6 py-4 text-left font-bold text-gray-900 dark:text-gray-100 backdrop-blur-sm bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-600/20 transition-colors flex items-center justify-between border-b border-white/20 dark:border-gray-700/20"
            >
              <span>{category}</span>
              <motion.div
                animate={{ rotate: activeCategory === category ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>
            
            <AnimatePresence>
              {activeCategory === category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative px-6 pb-6"
                >
                  <div className="flex flex-wrap gap-3 pt-4">
                    {skills.map((skill: ChipData, index: number) => (
                      <motion.div
                        key={index}
                        className={`rounded-full p-0.5 animate-gradient-x ${skill.gradient} shadow-sm`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-full text-sm text-gray-800 dark:text-gray-200 py-2 px-3 border border-white/20 dark:border-gray-700/20">
                          <skill.icon className="w-4 h-4" />
                          <span className="font-medium">{skill.chipName}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}