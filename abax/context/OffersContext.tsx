import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Offers {
    id: number;
    uuid: string;
    title: string;
    description: string;
    photo: string;
    link: string;
}

type OffersContextType = Offers[] | null;

export const OffersContext = createContext<OffersContextType>(null);

interface OffersProviderProps {
    children: ReactNode;
}

export const OffersProvider: React.FC<OffersProviderProps> = ({ children }) => {
    const [offers, setOffers] = useState<OffersContextType>(null);

    const fetchOffers = async () => {
        try {
                const response = await fetch('https://6f01-149-62-209-222.ngrok-free.app/api/get_offers', {
                    method: 'GET',  // Ensure the correct HTTP method is used
                    headers: {
                        'Content-Type': 'application/json' // Ensure content type is set
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Offers[] = await response.json();
                console.log('Group posts information:', data);

                setOffers(data);
        } catch (error) {
            console.error('Failed to fetch group information:', error);
        }
    };

    useEffect(() => {
        fetchOffers();
        
        const intervalId = setInterval(fetchOffers, 600000); // 120000ms = 2 minutes

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <OffersContext.Provider value={offers}>
            {children}
        </OffersContext.Provider>
    );
};
