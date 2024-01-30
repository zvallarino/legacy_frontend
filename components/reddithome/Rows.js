import React, {useContext} from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';


function Rows({ row }) {

    const router = useRouter();
    const { setCurrentName, setPostInfo } = useContext(AppContext);

    
    const formatNumber = (number) => {
        if (number < 1 && number > 0) {
            return `${(number * 100).toFixed(1)}%`; // Converts to percentage and fixes to 2 decimal places
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return number.toLocaleString();
        }
    };

    const handleClick = () => {
        const paramName = row.name || row.subreddit;
        const paraNumber = row.number || row.subscribers;
        setCurrentName(paramName); // Set the name in the context
        setPostInfo({name:paramName,number:paraNumber});
        router.push(`/sr_details`);
    };

    return (
        <div onClick={handleClick} className='flex justify-between'>
            <div className='text-sm mr-2 font-bold'>{row.rank||row.name}</div>
            <div className='text-sm text-left'>{row.subreddit||row.description}</div>
            <div className='text-sm text-left'>
            {row.number ? formatNumber(row.number) : (row.subscribers ? formatNumber(row.subscribers) : '')}
                </div>
        </div>
    );
}

export default Rows;
