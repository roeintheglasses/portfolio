import Chip from './Chip';

import { ChipData } from 'lib/types';

export default function ChipStack({ chipList }) {
  return (
    <div className="flex flex-row justify-center flex-wrap">
      {chipList.map((chip: ChipData, index: number) => (
        <Chip
          chipName={chip.chipName}
          gradient={chip.gradient}
          ChipIcon={chip.icon}
          key={index}
        />
      ))}
    </div>
  );
}
