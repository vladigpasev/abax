import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GroupContext = createContext(null);

export const GroupProvider = ({ children }: { children?: React.ReactNode }) => {
    const [groupInfo, setGroupInfo] = useState(null);

    useEffect(() => {
        const fetchGroupInfo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await fetch('https://5e98-149-62-207-222.ngrok-free.app/api/group-info', {
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

                    const data = await response.json();
                    setGroupInfo(data);
                }
            } catch (error) {
                console.error('Failed to fetch group information:', error);
            }
        };

        fetchGroupInfo();
    }, []);

    return (
        <GroupContext.Provider value={groupInfo}>
            {children}
        </GroupContext.Provider>
    );
};
