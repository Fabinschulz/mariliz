import { useGsap } from '@/shared/motion';
import { formatOrdinal } from '@/shared/utils';
import { useRef } from 'react';
import { processSteps } from '../domain';
import styles from './process-steps.module.scss';

export function ProcessSteps() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGsap(rootRef, ({ gsap }, root) => {
    const fill = root.querySelector(`.${styles.railFill}`);
    if (!fill) return;

    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 60%', scrub: 0.4 }
      }
    );

    root.querySelectorAll(`.${styles.step}`).forEach((step) => {
      gsap.fromTo(
        step,
        { '--step-progress': 0 },
        {
          '--step-progress': 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: step,
            start: 'top 68%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  });

  return (
    <div ref={rootRef} className={styles.root}>
      <span className={styles.rail} aria-hidden="true">
        <span className={styles.railFill} />
      </span>
      <ol role="list" className={styles.steps}>
        {processSteps.map((step, index) => (
          <li key={step.id} className={styles.step}>
            <span className={styles.marker} aria-hidden="true">
              {formatOrdinal(index)}
            </span>
            <div className={styles.content}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
              <p className={styles.output}>
                <span className="visually-hidden">Resultado: </span>
                {step.output}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
