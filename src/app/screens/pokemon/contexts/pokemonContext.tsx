'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getPokemonList, Pokemon } from '@/app/api/pokemon/list';
import { getPokemonDetail } from '@/app/api/pokemon/get';

interface PokemonContextProps {
  pokemonList: Pokemon[];
  pokemonCount: number;
  loading: boolean;
  error: string | null;
}

interface PokemonProviderProps {
  children: ReactNode;
  searchText?: string;
  orderPage?: string;
  currentPage?: number;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children, searchText, orderPage, currentPage }) => {
    const [pokemonList, setPokemonList] = useState<(Pokemon & any)[]>([]);
    const [pokemonCount, setPokemonCount] = useState(Number);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPokemonList();
    }, [searchText, orderPage, currentPage]);


    const fetchPokemonList = async () => {
        try {
            const limit = 25;
            let listResult = await getPokemonList();

            if(orderPage == 'asc') {
                listResult = listResult.sort((a, b) => a.name.localeCompare(b.name));
            } else if(orderPage == 'des') {
                listResult = listResult.sort((a, b) => b.name.localeCompare(a.name));
            }
            
            let filteredPokemonList = [];
            if(searchText) {
                filteredPokemonList = listResult.filter((pokemon) => {
                    return pokemon.name.toLowerCase().includes(searchText.toLowerCase());
                });
            } else {
                filteredPokemonList = listResult
            }

            setPokemonCount(filteredPokemonList.length)
            
            const startIndex = (currentPage ? currentPage - 1 : 0) * limit
            
            const slicedPokemonList = filteredPokemonList.slice(startIndex, startIndex+limit);
            
            const details = slicedPokemonList.map(async (pokemon, index) => {
                const detailsResult = await getPokemonDetail(pokemon.name);
                return { ...pokemon, ...detailsResult };
            });
            const detailsResults = await Promise.all(details);
            setPokemonList(detailsResults);
            setLoading(false);
        } catch (error) {
            setError('Error fetching Pokemon list');
            setLoading(false);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemonList, pokemonCount, loading, error }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error('usePokemonContext must be used within a PokemonProvider');
    }
    return context;
};
