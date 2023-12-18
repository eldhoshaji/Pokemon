import React, { useEffect, useState } from 'react';
import { RulerHorizontalIcon, LockClosedIcon, Cross2Icon, EyeNoneIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { formatStatName } from '@/lib/utils/formatUtils';
import { getPokemonSpeciesDetails } from '@/app/api/pokemon/get';

interface PokemonDetailCardProps {
    pokemon: any;
    onClose: () => void;
}

const PokemonDetailCard: React.FC<PokemonDetailCardProps> = ({ pokemon, onClose }) => {
    
    const [loading, setLoading] = useState<boolean>(true);
    const [about, setAbout] = useState<string>('');

    useEffect(() => {
        fetchPokemonDetails();
    }, [pokemon]);

    const fetchPokemonDetails = async () => {
        try {
            const details = await getPokemonSpeciesDetails(pokemon.order);            
            setAbout(details.flavor_text_entries[0].flavor_text)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    
    return (
        <div 
            key={pokemon.id}
            className=' md:h-[94%] min-w-[350px]'
            style={{
                background: 'white',
                padding: '5px',
                borderRadius: '5px',
                transition: 'box-shadow 0.3s, transform 0.3s',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
        <div className="relative overflow-hidden p-3 w-full h-full">
            <div 
                className="absolute top-0 left-0 right-0 h-full" 
                style={{ 
                    opacity: 0.75,
                    background: `linear-gradient(to bottom, var(--${pokemon.types[0]?.type?.name}) 25%, white 75%)`,
                    border: `2px solid var(--${pokemon.types[0]?.type?.name})`
                }}
            ></div>

            <div className='relative z-10 flex items-center flex-col'>

                <div className='w-full flex justify-end'>
                    <IconButton onClick={() => onClose()}
                        style={{backgroundColor: 'white', cursor: 'pointer'}} radius="full" variant="soft">
                        <Cross2Icon style={{color: `var(--${pokemon.types[0]?.type?.name}`}}
                            width="18" height="18"/>
                    </IconButton>
                </div>
                
                <img 
                    style={{marginTop: '-15px'}} 
                    src={pokemon.sprites.other.home.front_default} alt={pokemon.name} 
                    className="w-36 md:w-56 mb-3"
                />

                <div style={{color: 'white'}} className='text-2xl font-bold capitalize mb-3'>{pokemon.name}</div>

                <div className='flex flex-col items-center'>
                    <div className='flex gap-3 mb-5'>
                        { pokemon.types.map((item: any) => (
                            <div key={item.type.name} className='px-2 py-1 rounded' style={{ background: `var(--${item.type.name})`}}>
                                <p style={{color: 'white'}} className='text-xs uppercase'>{item.type.name}</p>
                            </div>)
                        )}
                    </div>
                    
                    <div className='flex gap-5 mb-5'>
                        <div className='flex flex-col items-center text-sm'>
                            <div className='flex items-center mb-2 font-semibold'>
                                <LockClosedIcon />
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

                    <div className='flex justify-center text-center text-sm mb-5 mx-2'>
                        <p className='line-clamp-3'>{about}</p>
                    </div>

                    <div className='flex p-2 rounded-2xl mb-5'
                        style={{background: `var(--${pokemon.types[0]?.type?.name})`, color: 'white'}}>
                        
                        <div className='flex items-center text-xs uppercase gap-3'>
                            BASE EXPERIENCE 
                            <span className='flex items-center justify-center rounded-full p-1 text-xs h-6 w-6 font-bold'
                                style={{background: `white`, color: `var(--${pokemon.types[0]?.type?.name})`}}>
                                {pokemon.base_experience}
                            </span>
                        </div>
                    </div>


                    <div className='flex flex-col items-center mb-5'>
                        <p className='font-semibold mb-3 text-sm'>ABILITIES</p>
                        <div className='flex gap-3'>
                            { pokemon.abilities.map((item: any) => (
                                <div key={item.ability.name} className='flex p-3 border-2 rounded-2xl'
                                    style={{borderColor: `var(--${pokemon.types[0]?.type?.name})`}}>
                                    { item.is_hidden ?
                                        <EyeNoneIcon width="18" height="18" className='mr-2'/>
                                        : null
                                    }
                                    <p className='text-xs uppercase'>{item.ability.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col items-center mb-5'>
                        <p className='font-semibold mb-3 text-sm'>STATS</p>
                        <div className='flex flex-wrap gap-3'>
                            { pokemon.stats.map((item: any) => (
                                <div key={item.stat.name} className='flex p-1 rounded-2xl'
                                    style={{background: `var(--background-card)`}}>
                                    <div className='flex items-center flex-col rounded-full'>
                                        <div className='flex items-center justify-center rounded-full p-1 text-xs h-9 w-9 mb-2'
                                         style={{background: `var(--${item.stat.name.toLowerCase()})`, color: 'white'}}>
                                            {formatStatName(item.stat.name)}
                                        </div>

                                        <p className='text-xs font-bold uppercase mb-1'>{item.base_stat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    );
};

export default PokemonDetailCard;
