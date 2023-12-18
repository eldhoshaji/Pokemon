import React, { useState, useRef } from 'react';
import { TextField, DropdownMenu, Select, Button, IconButton } from '@radix-ui/themes';
import { MagnifyingGlassIcon, TargetIcon, CaretDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image'

interface PokemonFiltersProps {
  dropdownData: { [key: string]: string[] };
  onSearch: (text: any) => void;
  onFilter: (filters: any) => void;
}

const PokemonFilters: React.FC<PokemonFiltersProps> = ({ dropdownData, onSearch, onFilter }) => {

    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

    const handleSearchClick = () => {
        const inputValue = inputRef.current ? (inputRef.current as HTMLInputElement).value : '';
        onSearch(inputValue)
    };

    const handleSelectChange = (value: string, category: string) => {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          [category]: value,
        }));
    }; 
    
    const handleApplyFilters = () => {
        onFilter(selectedFilters)
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='mb-3 p-3 w-full md:w-4/6 lg:w-3/6'>
                <TextField.Root size="3"
                    style={{
                        height: '50px', 
                        backgroundColor: 'white', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        borderRadius: '6px',
                    }}>  
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Input style={{height: '50px'}} placeholder="Search your pokemon!" ref={inputRef}
                            value={searchText} onChange={(e: any) => setSearchText(e.target.value)}/>
                    
                    <div className='flex items-center justify-center m-2 cursor-pointer p-1 rounded-lg z-50 relative w-10' 
                            style={{backgroundColor: 'red'}}>
                        <Image
                            onClick={handleSearchClick}
                            src="/logo.svg"
                            alt="Logo"
                            className="dark:invert"
                            width={20}
                            height={20}
                            priority
                        /> 
                    </div>
                </TextField.Root>
            </div>

            {/* <div className='flex justify-center flex-wrap gap-4 md:gap-8 mb-3'>
                {Object.entries(dropdownData).map(([category, values]) => (
                    <Select.Root key={category} onValueChange={(value: any)=> handleSelectChange(value, category)}>
                        <Select.Trigger  style={{
                                    height: '40px',
                                    backgroundColor: 'white',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                    borderRadius: '10px',
                                    width: '110px'
                                }}/>
                        <Select.Content>
                            { values.map((value) => (
                                <Select.Item 
                                    key={value}
                                    value={value}>
                                        {value}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                ))}
                <Button size="3" variant="solid" color="red" 
                    style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', cursor: 'pointer'}}
                    onClick={handleApplyFilters}>
                    Apply Filters
                </Button>
            </div> */}
        </div>
    );
};

export default PokemonFilters;
