import styles from '@/modules/locations/Locations.module.scss';
import { IRegion } from '@/types';
import { removeDash } from '@/utils';
import Link from 'next/link';

type Props = {
  location: string | null;
  locations?: IRegion[];
};

export function List({ location, locations }: Props) {
  return (
    <section className={styles.section}>
      {locations?.map(
        (l) =>
          l.name === location && (
            <ul className={styles.ul} key={l.name}>
              {l.locations
                .sort((a, b) => a.name.localeCompare(b.name))
                ?.map((ll) => (
                  <li key={ll.name}>
                    <Link
                      href={{
                        pathname: `/location/[name]`,
                        query: { name: ll.name },
                      }}
                      key={ll.name}
                    >
                      {removeDash(ll.name).replace(
                        /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea/g,
                        ``,
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          ),
      )}
    </section>
  );
}
