"use client"

import { useRouter } from 'next/navigation';


export default function GotoDjango() {

    const router = useRouter();

  const handleClick = () => {
    // Redirect to Django URL
    // window.location.href = 'http://127.0.0.1:8000/';
    const pathname = router.pathname;
    router.push('http://127.0.0.1:8000/');
  };

  return (
    <main className="">
        <button className="px-5 py-2.5 text-2xl font-bold text-white bg-red-500 border border-white rounded-full cursor-pointer shadow-lg" onClick={handleClick}>
          GO
        </button>
    </main>
  )
}
