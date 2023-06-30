import { IMove } from '@/types';
import { ImageWithFallback, capitalize, removeDash } from '@/utils';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  moves?: IMove[];
};

export function Search({ moves }: Props) {
  const [searchRes, setSearchRes] = useState<Fuse.FuseResult<IMove>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchMoves = (text: string) => {
    if (moves) {
      const fuse = new Fuse(moves, {
        keys: [`name`],
        includeMatches: true,
      });
      setSearchText(text);
      setSearchRes(fuse.search(text).slice(0, 5));
    }
  };

  return (
    <div className="search">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        placeholder="Move Name"
        onChange={(e) => searchMoves(e.target.value)}
      />
      {searchText && (
        <div className="searchContainer">
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${res.item.type.name}.png`}
                    alt=""
                    width={32}
                    height={32}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <Link
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: res.item.name },
                    }}
                    className="searchLink bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </Link>
                  <span className="searchId">
                    {capitalize(res.item.type.name)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
