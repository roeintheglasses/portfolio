import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import styles from 'styles/work-card.module.css';

export default function WorkCard({ cardInfo, isDark, gradient }) {
  const GetDescBullets = ({ descBullets, isDark }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? 'subTitle dark-mode-text' : 'subTitle'}
          >
            {item}
          </li>
        ))
      : null;
  };

  return (
    <Link href={`/work`}>
      <a
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
              <h5 className={styles.experienceTextCompany}>
                {cardInfo.company}
              </h5>
            </div>

            <Image
              crossOrigin={'anonymous'}
              className={'rounded-full z-50 top-10'}
              src={cardInfo.companylogo}
              alt={cardInfo.company}
              width={100}
              height={100}
              style={{ zIndex: 99999999, top: '8rem' }}
            />
          </div>
          <div className={styles.experienceTextDetails}>
            <h5
              className={
                isDark
                  ? styles.experienceTextRoleDark
                  : styles.experienceTextRole
              }
            >
              {cardInfo.role}
            </h5>
            <h5
              className={
                isDark
                  ? styles.experienceTextDateDark
                  : styles.experienceTextDate
              }
            >
              {cardInfo.date}
            </h5>
            <p
              className={
                isDark
                  ? styles.experienceTextDescDark
                  : styles.experienceTextDesc
              }
            >
              {cardInfo.desc}
            </p>
            <ul>
              <GetDescBullets
                descBullets={cardInfo.descBullets}
                isDark={isDark}
              />
            </ul>
          </div>
        </div>
      </a>
    </Link>
  );
}
