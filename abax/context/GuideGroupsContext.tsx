import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GuideGroup {
    id: number;
    uuid: string;
    groupName: string;
    joinCode: string;
    departure: string;
    returnDate: string;
}

type GuideGroupsContextType = GuideGroup[] | null;

export const GuideGroupsContext = createContext<GuideGroupsContextType>(null);

interface GuideGroupsProviderProps {
    children: ReactNode;
}

export const GuideGroupsProvider: React.FC<GuideGroupsProviderProps> = ({ children }) => {
    const [groupsInfo, setGroupsInfo] = useState<GuideGroupsContextType>(null);

    useEffect(() => {
        const fetchGroupsInfo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await fetch('https://6f01-149-62-209-222.ngrok-free.app/api/guides/get_groups', {
                        method: 'POST',  // Ensure the correct HTTP method is used
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json' // Ensure content type is set
                        },
                        body: JSON.stringify({})  // Include an empty body if required
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data: GuideGroup[] = await response.json();
                    console.log('Group information:', data);
                    setGroupsInfo(data);
                }
            } catch (error) {
                console.error('Failed to fetch group information:', error);
            }
        };

        fetchGroupsInfo();
    }, []);

    return (
        <GuideGroupsContext.Provider value={groupsInfo}>
            {children}
        </GuideGroupsContext.Provider>
    );
};