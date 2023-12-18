'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getPokemonList, Pokemon } from '@/app/api/pokemon/list';
import { getPokemonDetail } from '@/app/api/pokemon/get';

interface PokemonContextProps {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
}

interface PokemonProviderProps {
  children: ReactNode;
  searchText?: string; 
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children, searchText }) => {
    const [pokemonList, setPokemonList] = useState<(Pokemon & any)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    useEffect(() => {
        fetchPokemonList();
    }, [searchText]);


    const fetchPokemonList = async () => {
        try {
            const limit = 50;
            const listResult = await getPokemonList();
            
            let filteredPokemonList = [];
            if(searchText) {
                filteredPokemonList = listResult.filter((pokemon) => {
                    return pokemon.name.toLowerCase().includes(searchText.toLowerCase());
                });
            } else {
                filteredPokemonList = listResult
            }
            const slicedPokemonList = filteredPokemonList.slice(0, limit);
            const details = slicedPokemonList.map(async (pokemon, index) => {
                const detailsResult = await getPokemonDetail(pokemon.name);
                return { ...pokemon, ...detailsResult };
            });
            const detailsResults = await Promise.all(details);
            console.log(detailsResults)
            setPokemonList(detailsResults);
            setLoading(false);
        } catch (error) {
            setError('Error fetching Pokemon list');
            setLoading(false);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemonList, loading, error }}>
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
