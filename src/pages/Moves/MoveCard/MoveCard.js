import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../../components/Header/Header';
import Nav from '../../../components/Nav/Nav';
import Footer from '../../../components/Footer/Footer';
import Method from '../../../helpers/Method/Method';

import { Subtitle, Title } from '../../../components/BaseStyles/Headings';
import { Table } from '../../../components/BaseStyles/Table';

const MoveCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/move/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setMove(results);
        });
    }, [name]);

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=898')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    const [machine, setMachine] = useState([])

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/machine?limit=1700')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setMachine(results.map((res) => res.data));
        });
    }, []);

    const[version, setVersion] = useState('ultra-sun-ultra-moon');

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    const maxPp = move?.pp * 1.6;

    const title = `${name.replace(/-/g, ' ')}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Moves | PokéInfo`;
     }, [title]);

    return (
        <>
            <Header />
            <Nav />
            <main className='move'>
                {loading ? (
                    <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <Title>{move?.name?.replace(/-/g, ' ')}</Title>
                        <Subtitle>{move?.generation?.name?.replace(/-/g, ' ')}</Subtitle>

                        <nav className='move_nav'>
                            <ol className='move_nav_list'>
                                {move?.generation?.name === 'generation-i' &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen I</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('red-blue')}>Red / Blue</button>
                                            <button onClick={() => setVersion('yellow')}>Yellow</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen II</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('gold-silver')}>Gold / Silver</button>
                                            <button onClick={() => setVersion('crystal')}>Crystal</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen III</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('ruby-sapphire')}>Ruby / Sapphire</button>
                                            <button onClick={() => setVersion('emerald')}>Emerald</button>
                                            <button onClick={() => setVersion('firered-greenleaf')}>Fire Red / Green Leaf</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen IV</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('diamond-pearl')}>Diamond / Pearl</button>
                                            <button onClick={() => setVersion('platinum')}>Platinum</button>
                                            <button onClick={() => setVersion('heartgold-soulsilver')}>Heart Gold / Soul Silver</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen V</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('black-white')}>Black / White</button>
                                            <button onClick={() => setVersion('black-2-white-2')}>Black 2 / White 2</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen VI</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('x-y')}>X / Y</button>
                                            <button onClick={() => setVersion('omega-ruby-alpha-sapphire')}>Omega Ruby / Alpha Sapphire</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi' || move?.generation?.name === 'generation-vii') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen VII</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sun-moon')}>Sun / Moon</button>
                                            <button onClick={() => setVersion('ultra-sun-ultra-moon')}>Ultra Sun / Ultra Moon</button>
                                            <button onClick={() => setVersion('lets-go-pikachu-lets-go-eevee')}>Let's Go Pikachu / Let's Go Eevee</button>
                                        </div>
                                    </li>
                                }
                                {(move?.generation?.name === 'generation-i' || move?.generation?.name === 'generation-ii' || move?.generation?.name === 'generation-iii' || move?.generation?.name === 'generation-iv' || move?.generation?.name === 'generation-v' || move?.generation?.name === 'generation-vi' || move?.generation?.name === 'generation-vii' || move?.generation?.name === 'generation-viii') &&
                                    <li className='move_nav_list_dropdown'>
                                        <button className='move_nav_list_dropdown_button'>Gen VIII</button>
                                        <div className='move_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sword-shield')}>Sword / Shield</button>
                                        </div>
                                    </li>
                                }
                            </ol>
                        </nav>

                        <section className='move_data'>
                            <Table>
                                <tbody>
                                    <tr className='move_data_table_row'>
                                        <th>Type</th>
                                        <td className='move_data_table_row_element'>
                                            <div className='move_data_table_row_element_type' id={move?.type?.name}>
                                                <Link
                                                    to={`/types/${move?.type?.name}`}
                                                    key={move?.type?.name}
                                                >
                                                    <img alt={move?.type?.name} />
                                                    <span>{move?.type?.name}</span>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Category</th>
                                        <td className='move_data_table_row_element'>
                                            <div className='move_data_table_row_element_category' id={move?.damage_class?.name}>
                                                <img alt={move?.damage_class?.name} />
                                                <span>{move?.damage_class?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    {machine?.map((ma) => 
                                        ma?.version_group?.name === version && ma?.move?.name === move?.name &&
                                            <tr className='move_data_table_row'>
                                                <th className='move_data_table_row_head'>Machine / Record</th>
                                                <td className='move_data_table_row_element'>
                                                    <span>{ma?.item?.name.toUpperCase()}</span>
                                                </td>
                                            </tr>
                                    )}
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Power</th>
                                        <td className='move_data_table_row_element'>
                                            {move?.power !== null ? (
                                                move?.power
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>PP</th>
                                        <td className='move_data_table_row_element'>{move?.pp} (max. {maxPp})</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Accuracy</th>
                                        <td className='move_data_table_row_element'>
                                            {move?.accuracy !== null ? (
                                                move?.accuracy
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Status</th>
                                        <td className='move_data_table_row_element'>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Priority</th>
                                        <td className='move_data_table_row_element'>{move?.priority}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <ul className='move_effect'>
                                <li className='move_effect_container'>
                                    <h3 className='move_effect_container_title'>Effects</h3>
                                    <p className='move_effect_container_text'>
                                        <span><i>{move?.name?.replace(/-/g, ' ')}</i> </span>
                                        {move?.effect_entries?.map((me) => 
                                            me.language.name === 'en'  &&
                                                <>
                                                    {me?.effect
                                                        .replace(/\$effect_chance/g, `${move?.meta?.ailment_chance}`)
                                                        .replace('(100 - accuracy)', 100 - `${move?.accuracy}`)
                                                    }
                                                </>
                                        )} <br />
                                        {move?.flavor_text_entries?.map((mf) => 
                                            mf?.language?.name === 'en' && mf?.version_group?.name === version && 
                                                <>
                                                    {mf?.flavor_text}
                                                </>
                                        )}
                                    </p>
                                    <ul className='move_effect_container_meta'>
                                        {move?.meta?.ailment?.name !== 'none' && 
                                        <li className='move_effect_container_meta_element'>Status : <span>{move?.meta?.ailment?.name}</span></li>}
                                        {move?.meta?.ailment_chance !== 0 && 
                                        <li className='move_effect_container_meta_element'>Has a {move?.meta?.ailment_chance}% chance to {move?.meta?.ailment?.name} the target</li>}
                                        {move?.meta?.crit_rate !== 0 && 
                                        <li className='move_effect_container_meta_element'>Increase the chance of landing a critical hit by {move?.meta?.crit_rate} stage</li>}
                                        {move?.meta?.drain !== 0 && 
                                        <li className='move_effect_container_meta_element'>Drains {move?.meta?.drain}% of the damage inflicted to heal the user</li>}
                                        {move?.meta?.flinch_chance !== 0 && 
                                        <li className='move_effect_container_meta_element'>Has a {move?.meta?.flinch_chance}% of causing the target to flinch</li>}
                                        {move?.meta?.healing !== 0 && 
                                        <li className='move_effect_container_meta_element'>Recovers {move?.meta?.flinch_chance}% of the user's maximum HP</li>}
                                        {move?.meta?.min_hits !== null && 
                                        <li className='move_effect_container_meta_element'>This move hits between {move?.meta?.min_hits} and {move?.meta?.max_hits} times</li>}
                                        {move?.meta?.min_turns !== null &&  move?.meta?.min_turns !== move?.meta?.max_turns &&
                                        <li className='move_effect_container_meta_element'>
                                            This move last between {move?.meta?.min_turns} and {move?.meta?.max_turns} turns
                                        </li>}
                                        {move?.meta?.min_turns !== null &&  move?.meta?.min_turns === move?.meta?.max_turns &&
                                        <li className='move_effect_container_meta_element'>
                                            This move last {move?.meta?.min_turns} turns
                                        </li>}
                                    </ul>
                                </li>
                                <li className='move_effect_container'>
                                    {move?.stat_changes?.length > 0 &&
                                        <>
                                            <h4 className='move_effect_container_subtitle'>Stat modification</h4>
                                            <ul className='move_effect_container_stat'>
                                                {move?.stat_changes?.map((ms) => 
                                                    ms?.change < 0 ? (
                                                        <li className='move_effect_container_stat_element'>This move lower the target's <span>{ms?.stat?.name?.replace(/-/g, ' ')}</span> by {ms?.change} stage</li>
                                                    ) : (
                                                        <li className='move_effect_container_stat_element'>This move raises the target's <span>{ms?.stat?.name}</span> by {ms?.change} stage</li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    }
                                </li>
                                <li className='move_effect_container'>
                                    {move?.past_values?.length > 0 &&
                                        <>
                                            <h4 className='move_effect_container_subtitle'>Changes</h4>
                                            <ul className='move_effect_container_changes'>
                                                    {move?.past_values?.map((mp) => 
                                                        <>
                                                            {mp?.power !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.power} base power</li>}
                                                            {mp?.accuracy !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.accuracy} accuracy</li>}
                                                            {mp?.pp !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.pp} PP</li>}
                                                            {mp?.type !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> was {mp?.type} type</li>}
                                                            
                                                        </>
                                                    )}
                                            </ul>
                                        </>
                                    }
                                </li>
                                <li className='move_effect_container'>
                                    <h4 className='move_effect_container_subtitle'>Target</h4>
                                    <p className='move_effect_container_target'>{move?.target?.name.replace(/-/g, ' ')}</p>
                                </li>
                            </ul>
                        </section>

                        <Method 
                            toggleState={toggleState}
                            toggleTable={toggleTable}
                        />

                        <section  className={toggleState === 1 ? "active move_learn" : "hidden"}>
                            <h3 className='move_learn_title'>Learned by level up</h3>
                            <p className='move_learn_txt'>Learned when the pokémon reach a ceratin level. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                    {pokemon?.map((p) => 
                                        p?.moves?.map((pm) => 
                                            pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                            pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at > 1 &&
                                                <li className='move_learn_list_element'>
                                                    <img src={p?.sprites?.front_default} alt={p?.name} />
                                                    <Link
                                                    to={`/pokemon/${p?.name}`}
                                                    key={p?.name}
                                                    className='move_learn_list_element_name'>
                                                        {p?.name.replace(/-/g, ' ')}
                                                    </Link>
                                                    <p className='move_learn_list_element_lvl'>Level {pmv?.level_learned_at}</p>
                                                    <div className='move_learn_list_element_types'>
                                                        {p?.types?.map((pt) =>
                                                            <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                                <img alt={pt?.type?.name} />
                                                                <span>{pt?.type?.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                        )
                                    )}
                            </ul>
                        </section>

                        <section  className={toggleState === 2 ? "active move_learn" : "hidden"}>
                            <h3 className='move_learn_title'>Learned by TM / HM</h3>
                            <p className='move_learn_txt'>Learned by using a TM or a HM. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'machine' && pmv?.level_learned_at === 0 &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section  className={toggleState === 3 ? "active move_learn" : "hidden"}>
                            <h3 className='move_learn_title'>Learned from the Move Relearner / by breeding</h3>
                            <p className='move_learn_txt'>Learned at level 1 which means that the only way to learn this move is via the move relearner or through breeeding. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'egg' && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1 &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section  className={toggleState === 4 ? "active move_learn" : "hidden"}>
                            <h3 className='move_learn_title'>Learned by move tutor</h3>
                            <p className='move_learn_txt'>Learned by going to the move tutor. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'tutor' &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section  className={toggleState === 5 ? "active move_learn" : "hidden"}>
                            <h3 className='move_learn_title'>Learned when evolving</h3>
                            <p className='move_learn_txt'>Learned when the pokémon is evolving no matter its level. Data from Pokémon <span>{version.replace(/-/g, ' ')}</span>. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === version && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 0 && 
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <button className='back_button' onClick={() => navigate("/moves")}> ᐸ Back to moves</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MoveCard;