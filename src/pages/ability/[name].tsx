import { FaChevronLeft } from '@meronex/icons/fa';
import { type GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { Button, Loader, Separator, errorToast } from '@/components';
import {
  Description,
  Heading,
  Table,
  useFilterAbility,
} from '@/modules/abilities/ability';
import styles from '@/modules/abilities/ability/Ability.module.scss';
import { removeDash } from '@/utils';

type Props = {
  name: string;
};

function Ability({ name }: Props) {
  const overworld = `Overworld`;

  const {
    isLoading,
    isError,
    error,
    ability,
    pokemon,
    filterEffect,
    filterOverworld,
    filterDesc,
  } = useFilterAbility(name);

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <main className="mainBig">
        <h2 className="pageTitle">{ability && removeDash(ability?.name)}</h2>
        <h4 className="subtitle">
          {ability && removeDash(ability?.generation?.name)}
        </h4>

        <section className={styles.section}>
          <div className={styles.effect}>
            <h3 className="h3">Effect</h3>
            <p>{filterEffect?.effect}</p>
          </div>
          {filterOverworld && (
            <div className={styles.effect}>
              <h4 className="h4">Overworld</h4>
              <p>
                {filterOverworld?.effect
                  .slice(filterOverworld.effect.indexOf(overworld))
                  .replace(`Overworld:`, ``)}
              </p>
            </div>
          )}
        </section>
        <Description filterDesc={filterDesc} />
        <Separator />
        <section className={styles.section}>
          <h3 className="h3">
            Pokemon with{` `}
            <span className="capitalize">
              {ability && removeDash(ability?.name)}
            </span>
          </h3>
          <Table ability={ability} pokemon={pokemon} />
        </section>
        <Button intent="back" asChild>
          <Link href="/abilities">
            <FaChevronLeft />
            Back to Abilities
          </Link>
        </Button>
      </main>
    </>
  );
}

export default Ability;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
