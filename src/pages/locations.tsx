import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingLocations from '@/components/pages/Locations/Heading';
import { LocationSection } from '@/components/pages/Locations/Styled.Locations';
import { IRegion } from '@/types/Locations/Region';
import { regions } from '@/utils/DataArrays';
import { getRegions } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const ListLocations = dynamic(
  () => import(`@/components/pages/Locations/Components/List.Locations`),
);

const RegionsMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.RegionsMethod),
);

type Props = {
  initialRegions: IRegion[];
};

function LocationsPage({ initialRegions }: Props) {
  const [location, setLocation] = useState<string | null>(null);
  const [toggle, setToggle] = useState<number>(0);
  const {
    isLoading,
    error,
    data: locations,
  } = useQuery({
    queryKey: [`regions`],
    queryFn: getRegions,
    initialData: initialRegions,
  });

  useEffect(() => {
    setLocation(regions[toggle + 1]);
  }, [toggle]);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingLocations />
      <MainBig>
        <RegionsMethod toggle={toggle} setToggle={setToggle} />
        <ListLocations location={location} locations={locations} />
        {location === `galar` || location === `hisui` ? (
          <LocationSection>
            <p>
              No data for {location.charAt(0).toUpperCase() + location.slice(1)}
            </p>
          </LocationSection>
        ) : null}
      </MainBig>
    </>
  );
}

export default LocationsPage;

export async function getServerSideProps() {
  const initialRegions = await getRegions();
  return {
    props: {
      initialRegions,
    },
  };
}
