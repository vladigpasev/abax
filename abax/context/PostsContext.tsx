import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Posts {
    id: number;
    uuid: string;
    group_id: string;
    title: string;
    description: string;
    uploader: string;
    updatedAt?: string;
    uploaderName?: string;
}

type PostsContextType = Posts[] | null;

export const PostsContext = createContext<PostsContextType>(null);

interface GuideGroupsProviderProps {
    children: ReactNode;
}

export const PostsProvider: React.FC<GuideGroupsProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<PostsContextType>(null);

    const fetchGroupsInfo = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const response = await fetch('https://6f01-149-62-209-222.ngrok-free.app/api/get_posts', {
                    method: 'POST',  // Ensure the correct HTTP method is used
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json' // Ensure content type is set
                    },
                    body: JSON.stringify({})  // Include the groupUuid in the body
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: { post: Posts, guideName: string }[] = await response.json();
                console.log('Group posts information:', data);

                // Map the response data to include uploaderName in each post
                const formattedData = data.map(item => ({
                    ...item.post,
                    uploaderName: item.guideName
                }));

                setPosts(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch group information:', error);
        }
    };

    useEffect(() => {
        fetchGroupsInfo();
        
        const intervalId = setInterval(fetchGroupsInfo, 120000); // 120000ms = 2 minutes

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    );
};
