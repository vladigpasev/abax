import { View, Text } from 'tamagui'
import React, { useContext, useState } from 'react'
import { GroupContext } from '@/context/GroupContext';
import { Input, YGroup } from 'tamagui';
import { ActivityIndicator } from 'react-native';


const settings = () => {
    const groupInfo = useContext(GroupContext);
    //@ts-ignore
    const [fullName, setFullName] = useState(groupInfo?.participant_name || '');
    //@ts-ignore
    const [phone, setPhone] = useState(groupInfo?.phone_number || '');
    //@ts-ignore
    const [email, setEmail] = useState(groupInfo?.email || '');
    //@ts-ignore
    const [resNumber, setResNumber] = useState(groupInfo?.reservation_number || '');

    const handleFullNameChange = (text: string) => {
        setFullName(text);
    };

    const handlePhoneChange = (text: string) => {
        setPhone(text);
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handleResNumberChange = (text: string) => {
        setResNumber(text);
    };
    return (
        <View>
            {groupInfo ? <>
                <View>
                    <YGroup gap={10} paddingHorizontal={10} paddingVertical={10}>
                        <YGroup gap={5}>
                            <Text color={'gray'}>Име и фамилия:</Text>
                            <Input
                                onChangeText={handleFullNameChange}
                                value={fullName}
                                placeholder="Име и фамилия:"
                                autoCapitalize={'words'}
                                textContentType="name"
                                keyboardType="default"
                            />
                        </YGroup>
                        <YGroup gap={5}>
                            <Text color={'gray'}>Номер на резервация:</Text>
                            <Input
                                onChangeText={handleResNumberChange}
                                value={resNumber}
                                placeholder="Номер на резервация:"
                                autoCapitalize={'none'}
                                textContentType="oneTimeCode"
                                keyboardType="number-pad"
                            />
                        </YGroup>
                        <YGroup gap={5}>
                            <Text color={'gray'}>Телефон:</Text>
                            <Input
                                onChangeText={handlePhoneChange}
                                value={phone}
                                placeholder="Телефон:"
                                autoCapitalize={'none'}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                            />
                        </YGroup>
                        <YGroup gap={5}>
                            <Text color={'gray'}>Имейл (Опционално)</Text>
                            <Input
                                onChangeText={handleEmailChange}
                                value={email}
                                placeholder="Имейл (опционално):"
                                autoCapitalize={'none'}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                        </YGroup>

                    </YGroup>
                </View>
            </> : <ActivityIndicator size="large" color="#bf322c" />}

        </View>
    )
}

export default settings