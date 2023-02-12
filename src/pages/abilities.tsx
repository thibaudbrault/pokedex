import { LeftTitle } from '@/components/common/styles/Headings';
import { ModifiedMainBig } from '@/components/common/styles/Sizing';
import {
  ModifiedTable,
  TableContainer,
  TEffect,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useTableParams } from '@/hooks/useTableParams';
import { IAbility } from '@/types/Pokemon/Ability';
import { getAbilities } from '@/utils/DataFetch';
import { ColumnDef } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

const HeadingAbilities = dynamic(
  () => import(`@/components/pages/Abilities/Heading`),
);

type Props = {
  initialAbilities: IAbility[];
};

function AbilitiesPage({ initialAbilities }: Props) {
  const {
    isLoading,
    error,
    data: abilities,
  } = useQuery({
    queryKey: [`abilities`],
    queryFn: getAbilities,
    initialData: initialAbilities,
  });

  const data = useMemo(() => abilities, [abilities]);

  const columns = useMemo<ColumnDef<IAbility>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TName>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
        ),
      },
      {
        accessorFn: (row) =>
          row.flavor_text_entries.find((rf) => {
            return rf.language.name === `en`;
          })?.flavor_text || `-`,
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

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingAbilities />
      <ModifiedMainBig>
        <LeftTitle>Abilities</LeftTitle>
        <TableContainer ref={tableContainerRef}>
          <ModifiedTable>
            {tableHeader()}
            {tableBody()}
          </ModifiedTable>
        </TableContainer>
      </ModifiedMainBig>
    </>
  );
}

export default AbilitiesPage;

export async function getServerSideProps() {
  const initialAbilities = await getAbilities();
  return {
    props: {
      initialAbilities,
    },
  };
}
