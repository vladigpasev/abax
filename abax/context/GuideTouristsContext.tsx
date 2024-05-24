import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GuideTourists {
    id: number;
    group_id: string;
    reservation_number: string;
    participant_name: string;
    phone_number: string;
    msg_username?: string;
    email?: string;
}


type GuideGroupsContextType = GuideTourists[] | null;

export const GuideTouristsContext = createContext<GuideGroupsContextType>(null);

interface GuideGroupsProviderProps {
    children: ReactNode;
    groupUuid: string;
}

export const GuideTouristsProvider: React.FC<GuideGroupsProviderProps> = ({ children, groupUuid }) => {
    const [touristsInfo, setTouristsInfo] = useState<GuideGroupsContextType>(null);

    useEffect(() => {
        const fetchGroupsInfo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await fetch('https://5e98-149-62-207-222.ngrok-free.app/api/guides/get_tourists', {
                        method: 'POST',  // Ensure the correct HTTP method is used
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json' // Ensure content type is set
                        },
                        body: JSON.stringify({ groupUuid })  // Include the groupUuid in the body
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data: GuideTourists[] = await response.json();
                    console.log('Tourists information:', data);
                    setTouristsInfo(data);
                }
            } catch (error) {
                console.error('Failed to fetch group information:', error);
            }
        };

        fetchGroupsInfo();
    }, [groupUuid]);  // Add groupUuid as a dependency

    return (
        <GuideTouristsContext.Provider value={touristsInfo}>
            {children}
        </GuideTouristsContext.Provider>
    );
};
