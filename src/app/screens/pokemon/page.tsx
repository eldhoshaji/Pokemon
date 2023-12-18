'use client';

import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonDetailCard from './components/PokemonDetailCard';
import { PokemonProvider } from './contexts/pokemonContext';
import clsx from 'clsx';
import { TextField, DropdownMenu, Button, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, CaretDownIcon, TargetIcon } from '@radix-ui/react-icons';
import PokemonFilters from './components/PokemonFilters';

export default function Page() {

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showDetailCard, setShowDetailCard] = useState(false);
    const dropdownData = {
        Type: ['Grass', 'Bug', 'Fire', 'Ice'],
        Ability: ['Torrent', 'Defiant'],
        Height: ['0-1', '1-2', 'Above 2'],
        Weight: ['0-20', '20-40', '40-60', '60-80', '80-100', 'Above 100'],
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
        console.log(text)
    }

    const handleFilters = (filters: any) => {
        console.log(filters)
    }

    return (
        <div className='h-screen m-6'>
            <PokemonProvider>

                <div className="flex gap-3 w-full h-full">
                    <div>
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
                                'fixed md:relative inset-0 z-50 min-w-[400px] md:w-4/12 md:overflow-hidden h-full',
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
    );
    
}