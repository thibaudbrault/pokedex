import { Capitalize } from '@/components/common/styles/Headings';
import { Type } from '@/components/common/styles/Themes';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { Species } from '@/types/types';
import { removeDash } from '@/utils/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonDataDesc, PokemonDataTypes } from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: Species.Species;
  game: string;
};

function Desc({ pokemon, species, game }: Props) {
  const filterDesc =
    species?.flavor_text_entries &&
    species?.flavor_text_entries.find(
      (sf) => sf.language.name === `en` && sf.version.name === game,
    );

  return (
    <>
      <ul>
        {pokemon.id < 10000 && (
          <PokemonDataDesc>
            <span>
              {filterDesc?.flavor_text.replace(`\u000c`, ` `).replace(`é`, `É`)}
            </span>
            <p>
              Pokémon{` `}
              <Capitalize>
                <i>{removeDash(game)}</i>
              </Capitalize>
            </p>
          </PokemonDataDesc>
        )}
        <PokemonDataTypes>
          {pokemon?.types?.map((pt) => (
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
                  width={25}
                  height={25}
                />
                <span>{pt.type.name}</span>
              </Link>
            </Type>
          ))}
        </PokemonDataTypes>
      </ul>
    </>
  );
}

export default Desc;
