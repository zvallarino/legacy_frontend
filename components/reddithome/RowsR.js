import React, {useContext} from 'react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppContext';


function RowsR({ row, categoryName, screenType }) {

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

      // Helper to truncate journal title to 45 characters
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '..' : text;
  };


    const handleClick = () => {
        const paramName = categoryName;
        const paraNumber = row.pub_date;
        setCurrentName(paramName); // Set the name in the context
        setPostInfo({name:paramName,number:paraNumber});
        router.push(`/rdetails`);
    };

    return (
        <div onClick={handleClick} className='flex justify-between'>
               <div className={`${screenType === 'laptop' ? 'text-xs' : 'text-sm'}  text-black mr-2 font-bold`}>
        {truncateText(row.journal_title, 45)}
      </div>
      <div className={`ml-2 ${screenType === 'laptop' ? 'text-xs' : 'text-sm'}  text-left`}>{row.title}</div>
      <div className={`${screenType === 'laptop' ? 'text-xs' : 'text-sm'}  text-left`}>{row.pub_date}</div>
        </div>
    );
}

export default RowsR;
