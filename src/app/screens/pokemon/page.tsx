'use client';
import { Theme } from '@radix-ui/themes';

import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonDetailCard from './components/PokemonDetailCard';
import { PokemonProvider } from './contexts/pokemonContext';
import clsx from 'clsx';
import PokemonFilters from './components/PokemonFilters';

export default function Page() {

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showDetailCard, setShowDetailCard] = useState(false);
    const [searchText, setSearchText] = useState('');

    const dropdownData = {
        Type: ['Grass', 'Bug', 'Fire', 'Ice'],
        Ability: ['Torrent', 'Defiant'],
        Height: ['0-1m', '1-2m', 'Above 2m'],
        Weight: ['0-20kg', '20-40kg', '40-60kg', '60-80kg', '80-100kg', 'Above 100kg'],
    };

    const handlePokemonSelect = (pokemon: any) => {
        setSelectedPokemon(pokemon);
    };

    useEffect(() => {
        const handleResize = () => {
            // const width = window.innerWidth;
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [selectedPokemon]);

    useEffect(() => {
        // Delay the transition to ensure it works after the initial rendering
        const timeoutId = setTimeout(() => {
            setShowDetailCard(selectedPokemon !== null);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [selectedPokemon]);

    const handleClose = () => {
        setShowDetailCard(false);
        setTimeout(() => {
            setSelectedPokemon(null);
        }, 300); // Adjust the time based on your transition duration
    };

    const handleSearch = (text: string) => {
        setSearchText(text)
        handleClose()
    }

    const handleFilters = (filters: any) => {
        console.log(filters)
    }

    return (

        <Theme className='w-full'>
            <div className='flex items-center h-screen my-6 w-full'>
                <PokemonProvider searchText={searchText}>

                    <div className="flex gap-3 w-full h-full" >
                        <div className='w-full'>
                            <PokemonFilters 
                                dropdownData={dropdownData} 
                                onSearch={handleSearch}
                                onFilter={handleFilters}>
                            </PokemonFilters>
                            <PokemonCard onPokemonSelect={handlePokemonSelect}/>
                        </div>
                        {selectedPokemon && (
                            <div 
                                className={clsx(
                                    'fixed md:relative inset-0 z-50 min-w-[400px] md:w-4/12 md:overflow-hidden h-full mr-6',
                                    {
                                    'flex items-center justify-center': window.innerWidth < 768,
                                    },
                                )}
                                style={{
                                    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                                    opacity: showDetailCard ? 1 : 0,
                                    transform: `translateX(${showDetailCard ? '0%' : '100%'})`,    
                                }}
                            >
                                <PokemonDetailCard pokemon={selectedPokemon} onClose={handleClose}/>
                            </div>
                        )}
                    </div>
                </PokemonProvider>
            </div>
        </Theme>
    );
    
}