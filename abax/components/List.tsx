import React from 'react'
import { ListItem, YGroup } from 'tamagui'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from 'expo-router';

const ListItemComponent = ({ group }: any) => {
    return (
        <YGroup.Item>
            <Link href={'/guide/groups/' + group.uuid} asChild push >
                <ListItem
                    hoverTheme
                    pressTheme
                    title={group.groupName}
                    subTitle={`Departure: ${group.departure}`}
                    icon={<MaterialIcons name="group" size={24} color="black" />}
                    iconAfter={<EvilIcons name="chevron-right" size={24} color="black" />}
                />
            </Link>
        </YGroup.Item>
    )
}

export default ListItemComponent;