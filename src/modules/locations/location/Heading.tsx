import Head from 'next/head';

type Props = {
  name: string;
};

export function Heading({ name }: Props) {
  return (
    <Head>
      <title>
        {`${name
          ?.replace(/-/g, ` `)
          .replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase(),
          )}  | Location | PokéRef`}
      </title>
      <meta name="description" content={`Find every details about ${name}`} />
      <meta property="og:title" content={`${name} | Location | PokéRef`} />
      <meta
        property="og:description"
        content={`Find every details about ${name}`}
      />
      <meta
        property="og:url"
        content={`https://pokeref.app/locations/${name}`}
      />
      <meta property="og:type" content="website" />
    </Head>
  );
}
