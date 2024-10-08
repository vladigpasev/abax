import React from 'react';
import { ListItem, YGroup } from 'tamagui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';

const ListItemComponent = ({ group }: any) => {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? 'white' : 'black';

    return (
        <YGroup.Item>
            <Link href={'/guideView/' + group.uuid} asChild push>
                <ListItem
                    hoverTheme
                    pressTheme
                    title={group.groupName}
                    subTitle={`Departure: ${group.departure}`}
                    icon={<MaterialIcons name="group" size={24} color={iconColor} />}
                    iconAfter={<EvilIcons name="chevron-right" size={24} color={iconColor} />}
                />
            </Link>
        </YGroup.Item>
    );
};

export default ListItemComponent;
