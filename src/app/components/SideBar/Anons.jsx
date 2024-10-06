import React, { useState, useEffect } from 'react';

const Anons = () => {
    const [annons, setAnnons] = useState([]);

    useEffect(() => {
        // Replace this with your actual API call
        fetch('http://localhost:5000/api/v1/annons')
            .then(response => response.json())
            .then(data => setAnnons(data))
            .catch(error => console.error('Error fetching annons:', error));
    }, []);

    return (
        <div className="w-1/5 min-w-[250px]">
            {/* Header for the advertisement */}


            {/* Map through the annons and render each ad */}
            {annons.map((ad, index) => (
                <div className='mt-6'>  <div className="w-full  bg-[#E0111A] text-white flex items-center p-2">
                    <p className="font-bold">Реклама</p>
                </div>
                    <div key={ad._id} className="w-full  flex flex-col items-center border p-2 shadow-lg">

                        {ad.images_annos && ad.images_annos.length > 0 && (
                            <img
                                src={`http://localhost:5000/${ad.images_annos[0]}`}
                                alt={`Advertisement ${index}`}
                                className="h-auto max-w-full"
                            />
                        )}


                    </div>
                </div>

            ))}
        </div>
    );
};

export default Anons;
