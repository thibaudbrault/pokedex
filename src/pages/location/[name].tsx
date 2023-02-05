import React, { useEffect, useMemo, useState } from 'react';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import Nav from '@/components/pages/Locations/LocationCard/Components/Nav.LocationCard';
import { TableContainer, TName } from '@/components/common/styles/Table';
import Link from 'next/link';
import BackBtn from '@/components/common/ui/BackBtn';
import { useSwitchGame } from '@/components/pages/Locations/LocationCard/Hooks/useSwitchGame';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { ColumnDef } from '@tanstack/react-table';
import { ILocationArea } from '@/types/Locations/LocationArea';
import { useTableParams } from '@/hooks/useTableParams';

const TableHead = dynamic(() => import(`@/components/common/ui/TableHead`));
const HeadingLocation = dynamic(
  () => import(`@/components/pages/Locations/LocationCard/Heading`),
);
const AreaLocationCard = dynamic(
  () =>
    import(
      `@/components/pages/Locations/LocationCard/Components/Area.LocationCard`
    ),
);
const TableLocationCard = dynamic(
  () =>
    import(
      `@/components/pages/Locations/LocationCard/Components/Table.LocationCard`
    ),
);

type Props = {
  name: string;
}

function LocationCard({ name }: Props) {

  const [filteredArea, setFilteredArea] = useState([])

  const {
    game,
    setGame,
    toggleState,
    toggleTable,
    isLoading,
    error,
    location,
    area,
  } = useSwitchGame(name);

  useEffect(() => {
    setFilteredArea(
      area?.pokemon_encounters.map(a =>
        a.version_details.filter(av =>
          av.version.name === game
        )
      )
    )
  }, [])

  console.log(filteredArea)

  // const data = useMemo(() => [].concat(...filteredArea), [filteredArea])

  // const columns = useMemo<ColumnDef<ILocationArea>[]>(
  //   () => [
  //     // {
  //     //   accessorKey: 'pokemon.name',
  //     //   id: 'name',
  //     //   header: 'Pokemon',
  //     //   cell: info =>
  //     //     <TName>{info.getValue<string>().replace(/-/g, ` `)}</TName>
  //     // },
  //     {
  //       accessorFn: row => console.log(row),
  //       // accessorKey: 'method.name',
  //       id: 'method',
  //       header: 'Location',
  //       cell: info =>
  //         <td>{info.getValue<string>()}</td>
  //     },
  //     {
  //       accessorKey: 'chance',
  //       id: 'chance',
  //       header: 'Probability',
  //       cell: info =>
  //         <td>{info.getValue<string>()} %</td>
  //     },
  //     {
  //       accessorKey: 'max_level',
  //       id: 'level',
  //       header: 'Level',
  //       cell: info =>
  //         <td>{info.getValue<string>()}</td>
  //     },
  //     // {
  //     //   accessorKey: 'pokemon.name',
  //     //   id: 'name',
  //     //   header: 'Pokemon',
  //     //   cell: info =>
  //     //     <TName>{info.getValue<string>()}</TName>
  //     // },
  //   ],
  //   []
  // )

  // const { tableContainerRef, tableHeader, tableBody } = useTableParams(
  //   data,
  //   columns,
  // );

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocation name={name} />
      <MainBig>
        <CardTitle>
          {location?.name
            .replace(/-/g, ` `)
            .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)}
        </CardTitle>
        <Subtitle>
          {location?.region.name} - {game.replace(/-/g, ` `)}
        </Subtitle>
        <AreaLocationCard
          location={location}
          toggleState={toggleState}
          toggleTable={toggleTable}
        />
        <Nav setGame={setGame} />
        <Section>
          {/* <TableContainer ref={tableContainerRef}>
            <LocationTable>
              {tableHeader()}
              {tableBody()}
              <span>This area is not present in this game</span>
            </LocationTable>
          </TableContainer> */}
        </Section>
        <Link href="/locations" passHref>
          <BackBtn name="Locations" />
        </Link>
      </MainBig>
    </>
  );
}

export default LocationCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query
  return {
    props: {
      name
    }
  }
}