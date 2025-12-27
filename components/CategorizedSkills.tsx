import { skillCategories } from '../data/skills';
import { ChipData } from '../lib/types';

interface CategorizedSkillsProps {
  className?: string;
}

// Optimized chip with hover-only gradient effect
function SkillChip({ skill }: { skill: ChipData }) {
  const Icon = skill.icon;
  return (
    <div className="group relative">
      {/* Gradient border - visible on hover only */}
      <div
        className={`absolute inset-0 rounded-full ${skill.gradient} p-[2px] opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-200`}
      >
        <div className="h-full w-full rounded-full bg-gray-50 dark:bg-gray-900" />
      </div>
      {/* Chip content */}
      <div className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm group-hover:border-transparent group-hover:shadow-md motion-safe:transition-all motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-900">
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        <span className="font-medium text-gray-700 dark:text-gray-300">{skill.chipName}</span>
      </div>
    </div>
  );
}

// Category card component with glassmorphism style
function CategoryCard({ title, skills }: { title: string; skills: ChipData[] }) {
  return (
    <div className="rounded-xl border border-white/30 bg-white/20 p-4 shadow-lg backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/20 sm:p-5">
      <h4 className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: ChipData, index: number) => (
          <SkillChip key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function CategorizedSkills({ className = '' }: CategorizedSkillsProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Grid - 2 rows */}
      <div className="hidden space-y-4 md:block">
        {/* First row - 2 columns (Frontend, Backend) */}
        <div className="grid grid-cols-2 gap-4">
          <CategoryCard title="Frontend" skills={skillCategories.Frontend} />
          <CategoryCard title="Backend" skills={skillCategories.Backend} />
        </div>

        {/* Second row - 3 columns (Database, Messaging, Testing) */}
        <div className="grid grid-cols-3 gap-4">
          <CategoryCard title="Database" skills={skillCategories.Database} />
          <CategoryCard
            title="Messaging & Streaming"
            skills={skillCategories['Messaging & Streaming']}
          />
          <CategoryCard title="Testing" skills={skillCategories.Testing} />
        </div>
      </div>

      {/* Mobile - Stacked sections (no accordion) */}
      <div className="space-y-4 md:hidden">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <CategoryCard key={category} title={category} skills={skills as ChipData[]} />
        ))}
      </div>
    </div>
  );
}
