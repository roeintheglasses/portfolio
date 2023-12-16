import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import styles from 'styles/work-card.module.css';

export default function WorkCard({ cardInfo, isDark, gradient }) {
  const GetDescBullets = ({ descBullets, isDark }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li key={i} className={isDark ? 'text-white' : 'text-black'}>
            {item}
          </li>
        ))
      : null;
  };

  return (
    <Link
      href={`/work`}
      className={cn(
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
        gradient
      )}
    >
      <div
        className={isDark ? styles.experienceCardDark : styles.experienceCard}
      >
        <div
          style={{ background: cardInfo.color }}
          className={styles.experienceBanner}
        >
          <div className={styles.experienceBlurredDiv}></div>
          <div className={styles.experienceDivCompany}>
            <h5 className={styles.experienceTextCompany}>{cardInfo.company}</h5>
          </div>

          <Image
            crossOrigin={'anonymous'}
            className={styles.experienceRoundedimg}
            src={cardInfo.companylogo}
            alt={cardInfo.company}
          />
        </div>
        <div className={styles.experienceTextDetails}>
          <h5
            className={
              isDark ? styles.experienceTextRoleDark : styles.experienceTextRole
            }
          >
            {cardInfo.role}
          </h5>
          <h5
            className={
              isDark ? styles.experienceTextDateDark : styles.experienceTextDate
            }
          >
            {cardInfo.date}
          </h5>
          <p
            className={
              isDark ? styles.experienceTextDescDark : styles.experienceTextDesc
            }
          >
            {cardInfo.desc}
          </p>
        </div>
        <p className="text-right text-white font-light text-sm mx-4 my-2">
          Read More
        </p>
      </div>
    </Link>
  );
}
