import { ActivityIndicator, View } from 'react-native';
import React, { useContext } from 'react';
import ListItemComponent from '@/components/List';
import { ScrollView, Separator, Text, YGroup } from 'tamagui';
import { GuideGroupsContext, GuideGroup, GuideGroupsProvider } from '@/context/GuideGroupsContext';
import { Link } from 'expo-router';

const GuideAllGroups: React.FC = () => {
    const groupsInfo = useContext(GuideGroupsContext);

    return (
        <View>
            <ScrollView height={'100%'}>
                <YGroup alignSelf="center" bordered width={'100%'} size="$5" separator={<Separator />}>
                    {groupsInfo?.map((group: GuideGroup, index: number) => (
                        <ListItemComponent key={index} group={group} />
                    ))}
                </YGroup>
            </ScrollView>
        </View>
    );
};

export default GuideAllGroups;
