import React, {useContext} from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';


function Rows({ row }) {

    const router = useRouter();

    const { setCurrentName } = useContext(AppContext);

    const handleClick = () => {
        const paramName = row.name || row.subreddit;
        setCurrentName(paramName); // Set the name in the context
        router.push(`/sr_details`);
    };

    return (
        <div onClick={handleClick} className='flex justify-between'>
            <div className='text-sm mr-2 font-bold'>{row.rank||row.name}</div>
            <div className='text-sm text-left'>{row.subreddit||row.description}</div>
            <div className='text-sm text-left'>
            {row.number ? row.number.toLocaleString() : (row.subscribers ? row.subscribers.toLocaleString() : '')}
        
                </div>
        </div>
    );
}

export default Rows;
