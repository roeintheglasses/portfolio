import Chip from './Chip';

import { ChipData } from 'lib/types';
import { Badge } from '../Badge';

import cn from 'classnames';
export function BadgeDemo() {
  return <Badge>Badge</Badge>;
}

export default function ChipStack({ chipList }) {
  return (
    <>
      <div className="hidden md:flex flex-row justify-center flex-wrap">
        {chipList.map((chip: ChipData, index: number) => (
          <Chip
            chipName={chip.chipName}
            gradient={chip.gradient}
            ChipIcon={chip.icon}
            key={index}
          />
        ))}
      </div>
      <div className="mt-10 flex flex-row justify-center flex-wrap gap-4 md:hidden">
        {chipList.map((chip: ChipData, index: number) => (
          <div
            key={index}
            className={`p-0.5 rounded-full animate-gradient-x ${chip.gradient}`}
          >
            <Badge
              className="text-base bg-gray-50 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95"
              variant="secondary"
            >
              <chip.icon className="inline-block w-4 h-4 mr-2" />
              {chip.chipName}
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
}
