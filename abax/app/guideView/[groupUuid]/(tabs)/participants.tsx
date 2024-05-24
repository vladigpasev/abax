import React, { useContext, useState } from 'react';
import { View, ScrollView, Separator, YGroup, Input } from 'tamagui';
import { GuideTourists, GuideTouristsContext } from '@/context/GuideTouristsContext';
import TouristListComponent from '@/components/TouristsList';

const Participants = () => {
  const touristsInfo = useContext(GuideTouristsContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTourists = touristsInfo?.filter((tourist: GuideTourists) => {
    const query = searchQuery.toLowerCase();
    return (
      tourist.participant_name.toLowerCase().includes(query) ||
      tourist.reservation_number.toLowerCase().includes(query) ||
      tourist.phone_number.toLowerCase().includes(query)
    );
  });

  return (
    <View>
      <Input
        placeholder="Search by name, reservation number, or phone number"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          margin: 10,
        }}
      />
      <ScrollView height={'100%'}>
        <YGroup alignSelf="center" bordered width={'100%'} size="$5" separator={<Separator />}>
          {filteredTourists?.map((tourist: GuideTourists, index: number) => (
            <TouristListComponent key={index} tourist={tourist} />
          ))}
        </YGroup>
      </ScrollView>
    </View>
  );
};

export default Participants;
