import React from 'react';
import { RulerHorizontalIcon, LockClosedIcon, Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';

interface PokemonDetailCardProps {
    pokemon: any;
    onClose: () => void;
}

const PokemonDetailCard: React.FC<PokemonDetailCardProps> = ({ pokemon, onClose }) => {
    
    
    return (
        <div 
            key={pokemon.id}
            className='h-5/6 md:h-[93%] min-w-[350px]'
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
            >
                {/* <div style={{ position: 'absolute', top: '0', right: '0', width: '250', height: '250', objectFit: 'cover', borderRadius: '3px'}}>
                </div> */}

            </div>

            <div className='relative z-10 flex items-center flex-col'>

                <div className='w-full flex justify-end'>

                    <IconButton onClick={() => onClose()}
                        style={{backgroundColor: 'white', cursor: 'pointer'}} radius="full" variant="soft">
                        <Cross2Icon style={{color: `var(--${pokemon.types[0]?.type?.name}`}}
                            width="18" height="18"/>
                    </IconButton>

                </div>
                
                <img style={{marginTop: '-5px'}} src={pokemon.sprites.other.home.front_default} alt={pokemon.name} className="w-56 mb-3" />
                <div style={{color: 'white'}} className='text-2xl font-bold capitalize mb-3'>{pokemon.name}</div>

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
                </div>
            </div>
        </div>
     </div>
    );
};

export default PokemonDetailCard;
