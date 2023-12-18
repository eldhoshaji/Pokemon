'use client';
import { Theme } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonDetailCard from './components/PokemonDetailCard';
import { PokemonProvider } from './contexts/pokemonContext';
import clsx from 'clsx';
import PokemonFilters from './components/PokemonFilters';
import CustomPagination from './components/Paginator';

export default function Page() {

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showDetailCard, setShowDetailCard] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPage, setOrderPage] = useState('rank');
    const [pokemonCount, setPokemonCount] = useState(Number);

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
            const width = window.innerWidth;
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [selectedPokemon]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowDetailCard(selectedPokemon !== null);
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [selectedPokemon]);

    const handleClose = () => {
        setShowDetailCard(false);
        setTimeout(() => {
            setSelectedPokemon(null);
        }, 300);
    };

    const handleSearch = (text: string) => {
        setSearchText(text)
        handleClose()
    }

    const handleFilters = (filters: any) => {
        console.log(filters)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        handleClose()
    }

    const handleOrderChange = (order: string) => {
        setCurrentPage(1)
        setOrderPage(order)
        handleClose()
    }

    const handlePokemonList = (count: number) => {
        setCurrentPage(1)
        setPokemonCount(count)
    }

    return (

        <Theme className='w-full'>
            <div className='flex items-center h-screen my-6 w-full'>
                <PokemonProvider searchText={searchText} currentPage={currentPage} orderPage={orderPage}>
                    <div className="flex gap-3 w-full h-full" >
                        <div className='w-full'>
                            <div className='flex flex-col h-44 md:h-36'>
                                <PokemonFilters 
                                    dropdownData={dropdownData} 
                                    onSearch={handleSearch}
                                    onFilter={handleFilters}
                                ></PokemonFilters>

                                { pokemonCount > 0 ?
                                    <CustomPagination 
                                        totalPages={(Math.ceil(pokemonCount/25))} 
                                        currentPage={currentPage} 
                                        onChangePage={handlePageChange}
                                        onOrderChange={handleOrderChange}
                                    ></CustomPagination>
                                    : null
                                }  
                            </div>
                            
                            <PokemonCard onPokemonSelect={handlePokemonSelect} onPokemonListChange={handlePokemonList}/>
                        </div>
                        {selectedPokemon && (
                            <div 
                                className={clsx(
                                    'fixed md:relative inset-0 z-50 min-w-[400px] md:w-4/12 md:overflow-hidden h-full md:mr-6',
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