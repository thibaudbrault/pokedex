import { Type } from '@/components/common/styles/Themes';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  p: IPokemon;
};

function TypesPokemon({ p }: Props) {
  return p.types?.map((pt) => (
    <Type id={pt.type.name} key={pt.type.name}>
      <Link
        href={{
          pathname: `/type/[name]`,
          query: { name: pt.type.name },
        }}
      >
        <Image
          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${pt.type.name}.png`}
          alt={pt.type.name}
          width={20}
          height={20}
        />
        <span>{pt.type.name}</span>
      </Link>
    </Type>
  ));
}

export default TypesPokemon;
