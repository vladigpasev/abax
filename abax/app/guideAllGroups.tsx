import { ActivityIndicator, View } from 'react-native';
import React, { useContext } from 'react';
import ListItemComponent from '@/components/List';
import { Separator, Text, YGroup } from 'tamagui';
import { GuideGroupsContext, GuideGroup, GuideGroupsProvider } from '@/context/GuideGroupsContext';
import { Link } from 'expo-router';

const GuideAllGroupsDisplay: React.FC = () => {
    const groupsInfo = useContext(GuideGroupsContext);

    return (
        <View>
            <View>
                <Text padding={20} fontSize={20} fontWeight={'bold'}>Моите групи</Text>
                <YGroup alignSelf="center" bordered width={'100%'} size="$5" separator={<Separator />}>
                    {groupsInfo?.map((group: GuideGroup, index: number) => (
                        <ListItemComponent key={index} group={group} />
                    ))}
                </YGroup>
            </View>
        </View>
    );
};

const GuideAllGroups: React.FC = () => {
    return (
        <GuideGroupsProvider>
            <GuideAllGroupsDisplay />
        </GuideGroupsProvider>
    );
};

export default GuideAllGroups;
