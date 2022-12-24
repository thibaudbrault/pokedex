export const learnMethod: Record<string, string> = {
  1: `level-up`,
  2: `machine`,
  3: `egg`,
  4: `tutor`,
};

export const regions: Record<string, string> = {
  1: `kanto`,
  2: `johto`,
  3: `hoenn`,
  4: `sinnoh`,
  5: `unova`,
  6: `kalos`,
  7: `alola`,
  8: `galar`,
};

type Generations = {
  [key: string]: {
    name: string;
    value: string;
  };
};

export const generations: Generations = {
  1: { name: `generation I`, value: 'gen1' },
  2: { name: `generation II`, value: 'gen2' },
  3: { name: `generation III`, value: 'gen3' },
  4: { name: `generation IV`, value: 'gen4' },
  5: { name: `generation V`, value: 'gen5' },
  6: { name: `generation VI`, value: 'gen6' },
  7: { name: `generation VII`, value: 'gen7' },
  8: { name: `generation VIII`, value: 'gen8' },
};

type ObjectFilters = {
  [key: string]: {
    offset: number;
    limit: number;
  };
};

export const genFilters: ObjectFilters = {
  gen1: { offset: 0, limit: 151 },
  gen2: { offset: 151, limit: 100 },
  gen3: { offset: 251, limit: 135 },
  gen4: { offset: 386, limit: 107 },
  gen5: { offset: 493, limit: 156 },
  gen6: { offset: 649, limit: 72 },
  gen7: { offset: 721, limit: 88 },
  gen8: { offset: 809, limit: 96 },
};

export const formFilters: ObjectFilters = {
  alola: { offset: 995, limit: 30 },
  galar: { offset: 1065, limit: 25 },
  hisui: { offset: 1133, limit: 20 },
  mega: { offset: 937, limit: 70 },
  gmax: { offset: 1099, limit: 40 },
};

export const types: Record<string, string> = {
  1: `bug`,
  2: `dark`,
  3: `dragon`,
  4: `electric`,
  5: `fairy`,
  6: `fighting`,
  7: `fire`,
  8: `flying`,
  9: `ghost`,
  10: `grass`,
  11: `ground`,
  12: `ice`,
  13: `normal`,
  14: `poison`,
  15: `psychic`,
  16: `rock`,
  17: `steel`,
  18: `water`,
};

type SpeciesFilters = {
  game: string;
  version: string;
  min: number;
  max: number;
}[];

export const speciesFilters: SpeciesFilters = [
  {
    game: `yellow`,
    version: `yellow`,
    min: 0,
    max: 152,
  },
  {
    game: `crystal`,
    version: `crystal`,
    min: 151,
    max: 252,
  },
  {
    game: `emerald`,
    version: `emerald`,
    min: 251,
    max: 387,
  },
  {
    game: `platinum`,
    version: `platinum`,
    min: 386,
    max: 494,
  },
  {
    game: `black-2`,
    version: `black-2-white-2`,
    min: 493,
    max: 650,
  },
  {
    game: `x`,
    version: `x-y`,
    min: 649,
    max: 722,
  },
  {
    game: `ultra-sword`,
    version: `ultra-sun-ultra-moon`,
    min: 721,
    max: 810,
  },
  {
    game: `sword`,
    version: `sword-shield`,
    min: 809,
    max: 898,
  },
];

type GenNav = {
  gen: string;
  details: {
    game: string;
    version: string;
  }[];
}[];

export const genNav: GenNav = [
  {
    gen: `Gen I`,
    details: [
      {
        game: `red`,
        version: `red-blue`,
      },
      {
        game: `blue`,
        version: `red-blue`,
      },
      {
        game: `yellow`,
        version: `yellow`,
      },
    ],
  },
  {
    gen: `Gen II`,
    details: [
      {
        game: `gold`,
        version: `gold-silver`,
      },
      {
        game: `silver`,
        version: `gold-silver`,
      },
      {
        game: `crystal`,
        version: `crystal`,
      },
    ],
  },
  {
    gen: `Gen III`,
    details: [
      {
        game: `ruby`,
        version: `ruby-sapphire`,
      },
      {
        game: `sapphire`,
        version: `ruby-sapphire`,
      },
      {
        game: `emerald`,
        version: `emerald`,
      },
      {
        game: `firered`,
        version: `firered-leafgreen`,
      },
      {
        game: `leafgreen`,
        version: `firered-leafgreen`,
      },
    ],
  },
  {
    gen: `Gen IV`,
    details: [
      {
        game: `diamond`,
        version: `diamond-pearl`,
      },
      {
        game: `pearl`,
        version: `diamond-pearl`,
      },
      {
        game: `platinum`,
        version: `platinum`,
      },
      {
        game: `heartgold`,
        version: `heartgold-soulsilver`,
      },
      {
        game: `soulsilver`,
        version: `heartgold-soulsilver`,
      },
    ],
  },
  {
    gen: `Gen V`,
    details: [
      {
        game: `black`,
        version: `black-white`,
      },
      {
        game: `white`,
        version: `black-white`,
      },
      {
        game: `black-2`,
        version: `black-2-white-2`,
      },

      {
        game: `white-2`,
        version: `black-2-white-2`,
      },
    ],
  },
  {
    gen: `Gen VI`,
    details: [
      {
        game: `x`,
        version: `x-y`,
      },
      {
        game: `y`,
        version: `x-y`,
      },
      {
        game: `omega-ruby`,
        version: `omega-ruby-alpha-sapphire`,
      },
      {
        game: `alpha-sapphire`,
        version: `omega-ruby-alpha-sapphire`,
      },
    ],
  },
  {
    gen: `Gen VII`,
    details: [
      {
        game: `sun`,
        version: `sun-moon`,
      },
      {
        game: `moon`,
        version: `sun-moon`,
      },
      {
        game: `ultra-sun`,
        version: `ultra-sun-ultra-moon`,
      },
      {
        game: `ultra-moon`,
        version: `ultra-sun-ultra-moon`,
      },
      {
        game: `lets-go-pikachu`,
        version: `lets-go-pikachu-lets-go-eevee`,
      },

      {
        game: `lets-go-eevee`,
        version: `lets-go-pikachu-lets-go-eevee`,
      },
    ],
  },
  {
    gen: `Gen VIII`,
    details: [
      {
        game: `sword`,
        version: `sword-shield`,
      },
      {
        game: `shield`,
        version: `sword-shield`,
      },
    ],
  },
];