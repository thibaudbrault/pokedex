import styles from '@/modules/locations/Locations.module.scss';
import { removeDash } from '@/utils';

import type { ILocation } from '@/types';

type Props = {
  location?: ILocation;
  toggleState: number;
  toggleTable: (index: number) => void;
};

export function Area({ location, toggleState, toggleTable }: Props) {
  return (
    <section className={styles.navSection}>
      <nav className={styles.nav}>
        {location?.areas?.map((la, i) => (
          <button
            key={la.name}
            className={toggleState === i ? `button_active` : ``}
            onClick={() => toggleTable(i)}
          >
            {removeDash(la.name)
              .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
              .replace(/area/, ``)}
          </button>
        ))}
      </nav>
      <span>There is no information about this area</span>
    </section>
  );
}