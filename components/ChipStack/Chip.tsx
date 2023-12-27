import cn from 'classnames';

export default function Chip({ chipName, gradient, icon = null }) {
  return (
    <div
      className={cn(
        'mt-5 mr-2 rounded-full',
        'p-1 animate-gradient-x bg-gradient-to-r',
        gradient
      )}
    >
      <div className="bg-gray-50 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 rounded-full text-gray-800 dark:text-gray-200 py-2 px-5 w-max">
        {chipName}
      </div>
    </div>
  );
}
