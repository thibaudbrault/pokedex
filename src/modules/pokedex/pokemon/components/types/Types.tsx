import { Type } from '@/components/common/styles/Themes';
import { IType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

import { PokemonTypesList } from './Styled.Types.PokemonCard';
import { Table } from './Table';

type Props = {
  types: IType[];
};

export function Types({ types }: Props) {
  return (
    <section className="section" id="types">
      <h3 className="h3">Types relations</h3>
      <PokemonTypesList>
        {types.map((t) => (
          <Type id={t.name} key={t.name}>
            <Link
              href={{
                pathname: `/type/[name]`,
                query: { name: t.name },
              }}
            >
              <Image
                src={`/images/types/${t.name}.png`}
                alt={t.name}
                width={30}
                height={30}
              />
              <span>{t.name}</span>
            </Link>
          </Type>
        ))}
      </PokemonTypesList>
      <div>
        <Table types={types} />
      </div>
    </section>
  );
}