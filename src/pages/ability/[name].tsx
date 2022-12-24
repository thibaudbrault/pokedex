import React from 'react';

import { MainBig } from '@/components/common/styles/Sizing';
import {
  AbilityCardEffect,
  AbilityCardSection,
  AbilityCardTable,
  Sup,
} from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import {
  CardTitle,
  H3,
  H4,
  Span,
  Subtitle,
} from '@/components/common/styles/Headings';
import {
  TableContainer,
  ModifiedTable,
  THead,
  TLink,
  TName,
  TRow,
} from '@/components/common/styles/Table';
import { useAbility, usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Abilities } from '@/types/types';
import BackBtn from '@/components/common/ui/BackBtn';

function AbilityCard() {
  const router = useRouter();
  const { name } = router.query;

  const {
    isLoading,
    error,
    data: ability,
  } = useAbility(`https://pokeapi.co/api/v2/ability/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=1300`,
  );

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  const overworld = `Overworld`;

  return (
    <>
      <Head>
        <title>
          {typeof name === `string` &&
            name?.charAt(0).toUpperCase() + name?.slice(1)}
          {` `}| Ability | PokéRef
        </title>
        <meta name="description" content={`Find every details about ${name}`} />
        <meta property="og:title" content={`${name} | Ability | PokéRef`} />
        <meta
          property="og:description"
          content={`Find every details about ${name}`}
        />
        <meta
          property="og:url"
          content={`https://pokeref.app/ability/${name}`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <MainBig>
        <CardTitle>{ability.name.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{ability.generation.name.replace(/-/g, ` `)}</Subtitle>

        <AbilityCardSection>
          <AbilityCardEffect>
            <H3>Effect</H3>
            {ability.effect_entries?.map(
              (ae: Abilities.EffectEntries) =>
                ae.language.name === `en` && <p key={ae.effect}>{ae.effect}</p>,
            )}
          </AbilityCardEffect>
          {ability.effect_entries?.map(
            (ae: Abilities.EffectEntries) =>
              ae.language.name === `en` &&
              ae.effect.includes(`\n\nOverworld:`) && (
                <AbilityCardEffect key={ae.effect}>
                  <H4>Overworld</H4>
                  <p>
                    {ae.effect
                      .slice(ae.effect.indexOf(overworld))
                      .replace(`Overworld:`, ``)}
                  </p>
                </AbilityCardEffect>
              ),
          )}
        </AbilityCardSection>

        <AbilityCardSection>
          <H3>Game descriptions</H3>
          <AbilityCardTable>
            <tbody>
              {ability.flavor_text_entries?.map((af: Abilities.FlavorText) =>
                af.language.name === `en` ? (
                  <tr key={af.flavor_text}>
                    <th>{af.version_group.name.replace(/-/g, ` `)}</th>
                    <td>{af.flavor_text}</td>
                  </tr>
                ) : (
                  ``
                ),
              )}
            </tbody>
          </AbilityCardTable>
        </AbilityCardSection>

        <AbilityCardSection>
          <H3>
            Pokemon with <Span>{ability.name.replace(/-/g, ` `)}</Span>
          </H3>
          <TableContainer>
            <ModifiedTable>
              <THead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>
                    1<Sup>st</Sup> ability
                  </th>
                  <th>
                    2<Sup>nd</Sup> ability
                  </th>
                  <th>Hidden ability</th>
                </tr>
              </THead>
              <tbody>
                {ability.pokemon?.map((ap: Abilities.Pokemon) => (
                  <TRow key={ap.pokemon.name}>
                    <td>
                      {pokedex?.map(
                        (p) =>
                          p.name === ap.pokemon.name && (
                            <Image
                              key={p.name}
                              src={p.sprites.front_default}
                              alt="-"
                              loading="lazy"
                              width={64}
                              height={64}
                            />
                          ),
                      )}
                    </td>
                    <TName>
                      <TLink
                        href={{
                          pathname: `/pokemon/[name]`,
                          query: { name: ap.pokemon.name },
                        }}
                        key={ap.pokemon.name}
                      >
                        {ap.pokemon.name.replace(/-/g, ` `)}
                      </TLink>
                    </TName>
                    <td>
                      {pokedex?.map(
                        (p) =>
                          p.name === ap.pokemon.name && (
                            <TLink
                              key={p.abilities[0].ability.name}
                              href={{
                                pathname: `/ability/[name]`,
                                query: { name: p.abilities[0].ability.name },
                              }}
                              className={
                                p.abilities[0].ability.name === ability.name
                                  ? `bold`
                                  : ``
                              }
                            >
                              {p.abilities[0].ability.name.replace(/-/g, ` `)}
                            </TLink>
                          ),
                      )}
                    </td>
                    <td>
                      {pokedex?.map(
                        (p) =>
                          p.name === ap.pokemon.name && (
                            <TLink
                              key={p.abilities[1].ability.name}
                              href={{
                                pathname: `/ability/[name]`,
                                query: { name: p.abilities[1].ability.name },
                              }}
                              className={
                                p.abilities[1].ability.name === ability.name
                                  ? `bold`
                                  : ``
                              }
                            >
                              {p.abilities.length > 1
                                ? p.abilities[1].ability.name.replace(/-/g, ` `)
                                : `-`}
                            </TLink>
                          ),
                      )}
                    </td>
                    <td>
                      {pokedex?.map(
                        (p) =>
                          p.name === ap.pokemon.name && (
                            <TLink
                              key={p.abilities[2].ability.name}
                              href={{
                                pathname: `/ability/[name]`,
                                query: { name: p.abilities[2].ability.name },
                              }}
                              className={
                                p.abilities[2].ability.name === ability.name
                                  ? `bold`
                                  : ``
                              }
                            >
                              {p.abilities.length > 2
                                ? p.abilities[2].ability.name.replace(/-/g, ` `)
                                : `-`}
                            </TLink>
                          ),
                      )}
                    </td>
                  </TRow>
                ))}
              </tbody>
            </ModifiedTable>
          </TableContainer>
        </AbilityCardSection>

        <Link href="/abilities" passHref>
          <BackBtn name="Abilities" />
        </Link>
      </MainBig>
    </>
  );
}

export default AbilityCard;