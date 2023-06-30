import {
  TBold,
  TCapitalize,
  TEffect,
  TLink,
} from '@/components/common/styles/Table';
import { usePaginatedTableParams } from '@/hooks';
import { SearchContainer } from '@/modules/moves/Styled.Moves';
import { IItem } from '@/types';
import { removeDash } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useMemo } from 'react';
import { Search } from './Search';

type Props = {
  items?: IItem[];
};

export function Items({ items }: Props) {
  const data = useMemo(() => items, [items]);

  const columns = useMemo<ColumnDef<IItem>[]>(
    () => [
      {
        accessorKey: `sprites.default`,
        id: `sprites`,
        header: `Sprite`,
        cell: (info) => (
          <td>
            <Image
              src={info.getValue<string>() || ``}
              alt="-"
              width={30}
              height={30}
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
                pathname: `/item/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
      },
      {
        accessorKey: `category.name`,
        id: `category`,
        header: `Category`,
        cell: (info) => (
          <TCapitalize>{removeDash(info.getValue<string>())}</TCapitalize>
        ),
      },
      {
        accessorFn: (row) =>
          row.effect_entries.find((re) => {
            return re;
          })?.short_effect,
        id: `effect`,
        header: `Effect`,
        cell: (info) => (
          <TEffect>
            <span>{info.getValue<string>()}</span>
          </TEffect>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody, tablePagination } =
    usePaginatedTableParams(data, columns);

  return (
    <section>
      <SearchContainer>
        <h2 className="leftH2">Items</h2>
        <Search items={items} />
      </SearchContainer>
      <section className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
        {tablePagination()}
      </section>
    </section>
  );
}