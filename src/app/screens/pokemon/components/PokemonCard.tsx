import React, { useState, useEffect } from 'react';
import { usePokemonContext } from '../contexts/pokemonContext';
import Image from 'next/image'
import { RulerHorizontalIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { CardSkelton } from './CardSkelton';
// import Skeleton from 'react-loading-skeleton';

interface PokemonCardProps {
    onPokemonSelect: (pokemon: any) => void;
    onPokemonListChange: (count: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ onPokemonSelect, onPokemonListChange }) => {

    const { pokemonList, pokemonCount, loading } = usePokemonContext();

    const [hoveredCards, setHoveredCards] = useState(Array(pokemonList.length).fill(false));

    useEffect(() => {
        onPokemonListChange(pokemonCount)
    }, [pokemonCount]);

    const handleMouseEnter = (index: number) => {
        setHoveredCards((prev) => {
            const newHoveredCards = [...prev];
            newHoveredCards[index] = true;
            return newHoveredCards;
        });
    };

    const handleMouseLeave = (index: number) => {
        setHoveredCards((prev) => {
            const newHoveredCards = [...prev];
            newHoveredCards[index] = false;
            return newHoveredCards;
        });
    };

    const handlePokemonClick = (pokemon: any) => {
        onPokemonSelect(pokemon);
    };

    return (
        <div> { loading ?
            (
                <CardSkelton></CardSkelton>
            ) : ( !pokemonList.length ? 
                <div className='flex items-center justify-center w-full my-52 p-6 text-xl text-bold'>
                    Sorry, no Pokemon available based on your search.
                </div> :
                ( 
                    <div className="w-full flex gap-5 flex-wrap justify-center overflow-y-auto p-6" 
                        style={{height: window.innerWidth > 500 ? 'calc(100vh - 10rem)' : 'calc(100vh - 12rem)'}}>
                        
                        { pokemonList.map((pokemon: any, index: number) => (
                                <div 
                                    key={pokemon.id}
                                    style={{
                                        background: 'white',
                                        padding: '4px',
                                        borderRadius: '5px',
                                        transition: 'box-shadow 0.3s, transform 0.3s',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        transform: hoveredCards[index] ? 'scale(1.05)' : 'none',
                                        cursor: hoveredCards[index] ? 'pointer' : 'none',
                                        maxHeight: '344px'
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => handlePokemonClick(pokemon)} // Added click handler
                                >
                                    <div className="relative overflow-hidden p-3 w-64 h-full">
                                        <div 
                                            className="absolute top-0 left-0 right-0 h-full" 
                                            style={{ 
                                                opacity: hoveredCards[index] ? 1 : 0.75,
                                                background: `linear-gradient(to bottom, var(--${pokemon.types[0]?.type?.name}) 40%, white 60%)`,
                                                border: `2px solid var(--${pokemon.types[0]?.type?.name})`
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: '0', right: '0', width: '150px', 
                                                                height: '150px', objectFit: 'cover', borderRadius: '3px'}}>
                                                <Image
                                                    src="/pokeball.svg"
                                                    alt="Logo"
                                                    className="dark:invert"
                                                    width={150}
                                                    height={24}
                                                    priority
                                                />    
                                            </div>
                                                                
                                        </div>

                                        <div className='relative z-10 flex items-center flex-col'>
                                            <div className='flex justify-between w-full'> 
                                                <div style={{color: 'white'}} className='text-xl font-bold capitalize'>{pokemon.name}</div>
                                                <div style={{color: 'white'}} className='text-xl font-bold capitalize'>#0{pokemon.id}</div>
                                            </div>
                                            <img 
                                                src={hoveredCards[index] ? pokemon.sprites.other.home.front_shiny : pokemon.sprites.other.home.front_default} 
                                                alt={pokemon.name} className="w-36 mb-8" 
                                            />

                                            <div className='flex flex-col items-center'>
                                                <div className='flex gap-3'>
                                                    { pokemon.types.map((item: any) => (
                                                        <div key={item.type.name} className='px-2 py-1 rounded' style={{ background: `var(--${item.type.name})`}}>
                                                            <p style={{color: 'white'}} className='text-xs uppercase'>{item.type.name}</p>
                                                        </div>)
                                                    )}
                                                </div>
                                                <div className='flex gap-5 my-5'>
                                                    <div className='flex flex-col items-center text-sm'>
                                                        <div className='flex items-center mb-2 font-semibold'>
                                                            <LockClosedIcon/>
                                                            <span  className='ml-2'>{pokemon.weight/10} kg</span>
                                                        </div>
                                                        <span className='text-xs'>Weight</span>
                                                    </div>
                                                    <div className='border-l h-10 mx-3' style={{borderColor: 'var(--default)'}}></div>
                                                    <div className='flex flex-col items-center text-sm'>
                                                        <div className='flex items-center font-semibold mb-2'>
                                                            <RulerHorizontalIcon/>
                                                            <span className='ml-2'>{pokemon.height/10} m</span>
                                                        </div>
                                                        <span className='text-xs'>Height</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}


                    </div>
                )
            )}
        </div>
    );
};

export default PokemonCard;

