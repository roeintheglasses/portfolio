import Chip from './Chip';

export default function ChipStack({ chipList, gradient }) {
  return (
    <div className="flex flex-row justify-start flex-wrap">
      {chipList.map((chip: string, index) => (
        <Chip chipName={chip} gradient={gradient} key={index} />
      ))}
    </div>
  );
}
