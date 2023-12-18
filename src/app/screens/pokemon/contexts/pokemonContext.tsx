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
}

const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
    const [pokemonList, setPokemonList] = useState<(Pokemon & any)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const listResult = await getPokemonList();
                const details = listResult.map(async (pokemon) => {
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

        fetchPokemonList();
    }, []);

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
