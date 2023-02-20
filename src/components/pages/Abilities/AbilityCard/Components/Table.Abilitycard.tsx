import {
  FullWidthTable,
  TableContainer,
  TLink,
  TBold,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useTableParams } from '@/hooks/useTableParams';
import { IAbility } from '@/types/Pokemon/Ability';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Sup } from '../Styled.AbilityCard';

type Props = {
  ability?: IAbility;
  pokemon?: IPokemon[];
};

function TableAbilitycard({ ability, pokemon }: Props) {
  if (!ability || !pokemon?.length) {
    return <Loader />;
  }

  const data = useMemo(() => pokemon, [pokemon]);

  const columns = useMemo<ColumnDef<IPokemon>[]>(
    () => [
      {
        accessorKey: `sprites.front_default`,
        id: `sprite`,
        header: `Sprites`,
        cell: (info) => (
          <td>
            <ImageWithFallback
              src={info.getValue<string>() || ``}
              alt="-"
              width={96}
              height={96}
              fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
            />
          </td>
        ),
      },
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
      },
      {
        accessorFn: (row) => row.abilities[0].ability.name,
        id: `firstAbility`,
        header: () => (
          <span>
            1<Sup>st</Sup> ability
          </span>
        ),
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.abilities.length > 1 ? row?.abilities?.[1].ability.name : `-`,
        id: `secondAbility`,
        header: () => (
          <span>
            2<Sup>nd</Sup> ability
          </span>
        ),
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.abilities.length > 2 ? row?.abilities?.[2].ability.name : `-`,
        id: `thirdAbility`,
        header: () => <span>hidden ability</span>,
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <TableContainer ref={tableContainerRef}>
      <FullWidthTable>
        {tableHeader()}
        {tableBody()}
      </FullWidthTable>
    </TableContainer>
  );
}

export default TableAbilitycard;
