"use client"
import React, { useState, useEffect } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

const Dropdown = ({timeRange, setTimeRange}) => {
    // Default value

    
    const [isOpen, setIsOpen] = useState(false); // State to track if dropdown is open

    

    const options = [
        { value: '1d', label: '1 Day' },
        { value: '7d', label: '7 Days' },
        { value: '1m', label: '1 Month' },
        { value: '3m', label: '3 Months' },
        { value: '1y', label: '1 Year' },
        { value: 'all', label: 'All' }
    ];

    const handleChange = (event) => {
        setTimeRange(event.target.value);
        setIsOpen(false); // Close dropdown after selection
    };

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ position: 'relative', border: '1px solid black', display: 'inline-block' }} className='text-black'>
            <select
                value={timeRange}
                onChange={handleChange}
                onClick={handleDropdown}
                style={{ border: 'none', appearance: 'none', padding: '5px', width: '100%' }}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {!isOpen && <AiFillCaretDown style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }} />}
        </div>
    );
};

export default Dropdown;