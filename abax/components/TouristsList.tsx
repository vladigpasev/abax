import React from 'react';
import { ListItem, YGroup } from 'tamagui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';

const TouristListComponent = ({ tourist }: any) => {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === 'dark' ? 'white' : 'black';

    return (
        <YGroup.Item>
            <Link href={'/guideView/' + tourist.group_id + '/' + tourist.uuid} asChild push>
                <ListItem
                    hoverTheme
                    pressTheme
                    title={tourist.participant_name}
                    subTitle={`Номер на резервация: ${tourist.reservation_number}`}
                    icon={<MaterialIcons name="person" size={24} color={iconColor} />}
                    iconAfter={<EvilIcons name="chevron-right" size={24} color={iconColor} />}
                />
            </Link>
        </YGroup.Item>
    );
};

export default TouristListComponent;
