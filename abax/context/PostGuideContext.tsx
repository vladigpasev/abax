import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PostGuide {
    id: number;
    uuid: string;
    group_id: string;
    title: string;
    description: string;
    uploader: string;
    updatedAt?: string;
    uploaderName?: string;
}

type PostGuideContextType = PostGuide[] | null;

export const PostGuideContext = createContext<PostGuideContextType>(null);

interface GuideGroupsProviderProps {
    children: ReactNode;
    groupUuid: string;
}

export const PostGuideProvider: React.FC<GuideGroupsProviderProps> = ({ children, groupUuid }) => {
    const [posts, setPosts] = useState<PostGuideContextType>(null);

    useEffect(() => {
        const fetchGroupsInfo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await fetch('https://5e98-149-62-207-222.ngrok-free.app/api/guides/get_posts', {
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

                    const data: { post: PostGuide, guideName: string }[] = await response.json();
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

        fetchGroupsInfo();
    }, [groupUuid]);  // Add groupUuid as a dependency

    return (
        <PostGuideContext.Provider value={posts}>
            {children}
        </PostGuideContext.Provider>
    );
};
