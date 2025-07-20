export default function Chip({ chipName, gradient, ChipIcon }) {
  return (
    <div
      className={`mt-5 mr-2 rounded-full p-1 animate-gradient-x ${gradient}`}
    >
      <div className="flex flex-row gap-2 justify-between items-center bg-gray-50 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 rounded-full text-xl text-gray-800 dark:text-gray-200 py-3 px-6 w-max">
        {ChipIcon && <ChipIcon />}
        {chipName}
      </div>
    </div>
  );
}
