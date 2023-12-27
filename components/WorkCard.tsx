import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import styles from 'styles/work-card.module.css';

export default function WorkCard({ cardInfo, isDark, gradient }) {
  return (
    <Link
      href={`/work`}
      className={cn(
        'transform hover:-translate-y-2 transition-all',
        'rounded-xl w-11/12 lg:w-[18rem] xl:w-[20rem] bg-gradient-to-r p-1',
        gradient
      )}
    >
      <div
        className={cn(
          styles.experienceCard,
          'bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-95 h-full rounded-lg'
        )}
      >
        <div
          style={{ background: cardInfo.color }}
          className={cn(styles.experienceBanner, 'rounded-t-lg')}
        >
          <div className={styles.experienceBlurredDiv}></div>
          <div className={styles.experienceDivCompany}>
            <h5
              className={cn(
                styles.experienceTextCompany,
                'text-center p-5 text-white mb-10 font-sans text-3xl font-semibold '
              )}
            >
              {cardInfo.company}
            </h5>
          </div>

          <Image
            crossOrigin={'anonymous'}
            className={styles.experienceRoundedimg}
            src={cardInfo.companylogo}
            width={100}
            height={100}
            alt={cardInfo.company}
          />
        </div>
        <div className={styles.experienceTextDetails}>
          <h5
            className={
              'text-black dark:text-white text-center font-sans text-3xl font-semibold'
            }
          >
            {cardInfo.role}
          </h5>
          <h5
            className={cn(
              styles.experienceTextDate,
              'text-black dark:text-white'
            )}
          >
            {cardInfo.date}
          </h5>
          <p className={'text-black dark:text-white text-center'}>
            {cardInfo.desc}
          </p>
        </div>
        <p className="text-right text-black dark:text-white  font-light text-sm px-4 py-2">
          Read More
        </p>
      </div>
    </Link>
  );
}
