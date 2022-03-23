import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../../components/Header/Header';
import Nav from '../../../components/Nav/Nav';
import Footer from '../../../components/Footer/Footer';
import Data from './Data/Data';
import Info from './Info/Info';
import Stats from './Stats/Stats';
import Moves from './Moves/Moves';
import Sprites from './Sprites/Sprites';

function PokemonCard() {

    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results);
        });
    }, [name]);

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setSpecies(results);
        });
    }, [name]);

    const evolutionChainUrl = species?.evolution_chain?.url;

    const [evolution, setEvolution] = useState([]);

    useEffect(() => {
        axios
        .get(`${evolutionChainUrl}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setEvolution(results);
        });
    }, [evolutionChainUrl]);

    const [move, setMove] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/move?limit=826')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setMove(results.map((res) => res.data));
        });
    }, []);

    const [machine, setMachine] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/machine?limit=1700')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setMachine(results.map((res) => res.data));
        });
    }, []);

    const [location, setLocation] = useState([]);

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLocation(results);
        });
    }, [name]);

    const [game, setGame] = useState('red');
    const [version, setVersion] = useState('red-blue');

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    const title = `${name.replace(/-/g, ' ')}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Pokémon | PokéInfo`;
    }, [title]);

    return (
        <>
            <Header />
            <Nav />
            <main className='pokemon'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        {pokemon?.name?.includes('mega') ? (
                            <h2 className='pokemon_title'>{pokemon?.name?.replace(/-/g, ' ').split(' ').reverse().join(' ')}</h2>
                        ) : (
                            <h2 className='pokemon_title'>{pokemon?.name?.replace(/-/g, ' ')}</h2>
                        )}
                        <p className='pokemon_gen'>{species?.generation?.name?.replace(/-/g, ' ')}</p>

                        <nav className='pokemon_nav'>
                            <ol className='pokemon_nav_list'>
                                {(pokemon?.id < 152 || species?.id < 152) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen I</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('red'); setVersion('red-blue'); }}>Red</button>
                                            <button onClick={() => { setGame('blue'); setVersion('red-blue'); }}>Blue</button>
                                            <button onClick={() => { setGame('yellow'); setVersion('yellow'); }}>Yellow</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 252 || species?.id < 252) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen II</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('gold'); setVersion('gold-silver'); }}>Gold</button>
                                            <button onClick={() => { setGame('silver'); setVersion('gold-silver'); }}>Silver</button>
                                            <button onClick={() => { setGame('crystal'); setVersion('crystal'); }}>Crystal</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 387 || species?.id < 387) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen III</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('ruby'); setVersion('ruby-sapphire'); }}>Ruby</button>
                                            <button onClick={() => { setGame('sapphire'); setVersion('rub-sapphire'); }}>Sapphire</button>
                                            <button onClick={() => { setGame('emerald'); setVersion('emerald'); }}>Emerald</button>
                                            <button onClick={() => { setGame('firered'); setVersion('firered-leafgreen'); }}>Fire Red</button>
                                            <button onClick={() => { setGame('greenleaf'); setVersion('firered-leafgreen'); }}>Green Leaf</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 494 || species?.id < 494) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen IV</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('diamond'); setVersion('diamond-pearl'); }}>Diamond</button>
                                            <button onClick={() => { setGame('pearl'); setVersion('diamond-pearl'); }}>Pearl</button>
                                            <button onClick={() => { setGame('platinum'); setVersion('platinum'); }}>Platinum</button>
                                            <button onClick={() => { setGame('heartgold'); setVersion('heartgold-soulsilver'); }}>Heart Gold</button>
                                            <button onClick={() => { setGame('soulsilver'); setVersion('heartgold-soulsilver'); }}>Soul Silver</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 650 || species?.id < 650) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen V</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('black'); setVersion('black-white'); }}>Black</button>
                                            <button onClick={() => { setGame('white'); setVersion('black-white'); }}>White</button>
                                            <button onClick={() => { setGame('black-2'); setVersion('black-2-white-2'); }}>Black 2</button>
                                            <button onClick={() => { setGame('white-2'); setVersion('black-2-white-2'); }}>White 2</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 722 || species?.id < 722) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VI</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('x'); setVersion('x-y'); }}>X</button>
                                            <button onClick={() => { setGame('y'); setVersion('x-y'); }}>Y</button>
                                            <button onClick={() => { setGame('omega-ruby'); setVersion('omega-ruby-alpha-sapphire'); }}>Omega Ruby</button>
                                            <button onClick={() => { setGame('alpha-sapphire'); setVersion('omega-ruby-alpha-sapphire'); }}>Alpha Sapphire</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 810 || species?.id < 810) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VII</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('sun'); setVersion('sun-moon'); }}>Sun</button>
                                            <button onClick={() => { setGame('moon'); setVersion('sun-moon'); }}>Moon</button>
                                            <button onClick={() => { setGame('ultra-sun'); setVersion('ultra-sun-ultra-moon'); }}>Ultra Sun</button>
                                            <button onClick={() => { setGame('ultra-moon'); setVersion('ultra-sun-ultra-moon'); }}>Ultra Moon</button>
                                            <button onClick={() => { setGame('lets-go-pikachu'); setVersion('lets-go-pikachu-lets-go-eevee'); }}>Let's Go Pikachu</button>
                                            <button onClick={() => { setGame('lets-go-eevee'); setVersion('lets-go-pikachu-lets-go-eevee'); }}>Let's Go Eevee</button>
                                        </div>
                                    </li>
                                }
                                {(pokemon?.id < 899 || species?.id < 899) &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VIII</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => { setGame('sword'); setVersion('sword-shield'); }}>Sword</button>
                                            <button onClick={() => { setGame('shield'); setVersion('sword-shield'); }}>Shield</button>
                                        </div>
                                    </li>
                                }
                            </ol>
                        </nav>

                        <Data 
                            pokemon={pokemon}
                            species={species}
                            location={location}
                            game={game}
                        />

                        <section className='pokemon_evo'>
                            <h3 className='pokemon_evo_title'>Evolution chain</h3>
                            <div className='pokemon_evo_container'>
                                <div className='pokemon_evo_container_inner'>
                                    <div className='pokemon_evo_container_inner_pokemon'>
                                        <Link
                                            to={`/pokemon/${evolution?.chain?.species?.name}`}
                                        >
                                            {evolution?.chain?.species?.name?.replace(/-/g, '')}
                                        </Link>
                                    </div>
                                </div>
                                <div className='pokemon_evo_container_inner'>
                                    {evolution?.chain?.evolves_to?.map((ee) => 
                                        <div className='pokemon_evo_container_inner_stade'>
                                            <div className='pokemon_evo_container_inner_stade_method'>
                                                {ee?.evolution_details?.map((eed) =>
                                                    <p className='pokemon_evo_container_inner_stade_method_details'>Level {eed?.min_level}</p>
                                                )}
                                                <p className='pokemon_evo_container_inner_stade_method_arrow'>➜</p>
                                            </div>
                                            <div className='pokemon_evo_container_inner_stade_pokemon'>
                                                <Link
                                                    to={`/pokemon/${ee?.species?.name}`}
                                                >
                                                    {ee?.species?.name?.replace(/-/g, '')}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={evolution?.chain?.evolves_to[0]?.evolves_to?.[0]?.length > 0 ? ('pokemon_evo_container_inner') : ('hidden')}>
                                    {evolution?.chain?.evolves_to?.map((ee) => ee?.evolves_to?.map((eet) => 
                                        <div className='pokemon_evo_container_inner_stade'>
                                            <div className='pokemon_evo_container_inner_stade_pokemon'>
                                                <Link
                                                    to={`/pokemon/${eet?.species?.name}`}
                                                >
                                                    {eet?.species?.name?.replace(/-/g, '')}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <Info 
                            pokemon={pokemon}
                            species={species}
                            evolution={evolution}
                        />

                        <Stats 
                            pokemon={pokemon}
                        />

                        <Moves 
                            toggleState={toggleState}
                            toggleTable={toggleTable}
                            pokemon={pokemon}
                            move={move}
                            machine={machine}
                            version={version}
                            game={game}
                        />
                        
                        <Sprites 
                            pokemon={pokemon}
                        />

                        <button className='back_button' onClick={() => navigate("/")}> ᐸ Back to pokemon</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default PokemonCard