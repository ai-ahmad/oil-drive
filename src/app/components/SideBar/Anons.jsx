import React, { useState, useEffect } from 'react';
import { IoRocket } from "react-icons/io5";

const Anons = () => {
    const [annons, setAnnons] = useState([]);
    const [error, setError] = useState(null);

    const fetchAnnons = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/annons');
            if (!response.ok) {
                throw new Error('Failed to fetch advertisements');
            }
            const data = await response.json();
            setAnnons(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAnnons();
    }, []);

    return (
        <div className="w-1/5 min-w-[250px]">
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                annons.map((ad, index) => (
                    <div className='mt-6' key={ad._id}>
                        <div className="w-full bg-[#E0111A] text-white flex gap-2 items-center p-2 rounded-t-lg">
                            <IoRocket />
                            <p className="font-bold">Реклама</p>
                        </div>
                        <div className="w-full flex flex-col items-center border p-2 shadow-lg">
                            {ad.images_annos && ad.images_annos.length > 0 && (
                                <img
                                    src={`http://localhost:5000/${ad.images_annos[0]}`}
                                    alt={`Advertisement ${index}`}
                                    className="h-auto max-w-full"
                                />
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Anons;
