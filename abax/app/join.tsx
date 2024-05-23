import { BackButton } from "@/components/BackButton";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Text, View, YGroup } from 'tamagui'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

export default function Join() {
    const [code, setCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [resNumber, setResNumber] = useState('');

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const navigation = useNavigation()

    const handleCodeChange = (text: string) => {
        setCode(text);
        setSuccess(false);
        setErrorMsg('');
        if (text.length === 6) {
            // Make the API request with the code
            findGroup(text);
        }
    };

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

    useEffect(() => {
        if (fullName.length > 2 && phone.length > 7 && resNumber.length > 2) {
            // Make the API request with the code
            setShowSubmitButton(true);
        } else {
            setShowSubmitButton(false);
        }
    }, [fullName, phone, resNumber]);

    const findGroup = (code: string) => {
        // Make the API request here using the code
        // Example:
        fetch(`http://192.168.50.247:3000/api/find`, {
            method: 'POST',
            body: JSON.stringify({ joinCode: code }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the API response
                console.log(data);
                if (data.guide) {
                    router.replace('/guide');
                }
                if (data.success === true) {
                    setSuccess(data.success);
                } else {
                    setSuccess(data.success);
                    setErrorMsg(data.message);
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);
                setErrorMsg('An error occurred. Please try again.');
            });
    };

    const joinGroup = () => {
        // Make the API request here using the code
        // Example:
        fetch(`http://192.168.50.247:3000/api/add-participant`, {
            method: 'POST',
            body: JSON.stringify({ fullName, phone, email, joinCode: code, resNumber }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the API response
                console.log(data);
                if (data.success) {
                    const saveToken = async () => {
                        try {
                            await AsyncStorage.setItem('accessToken', data.accessToken);
                        } catch (e) {
                            console.log(e);
                        }
                    };
                    saveToken();
                    //router.replace('/group');
                    while (router.canGoBack()) { router.back() } router.replace("/group");
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);
                setErrorMsg('An error occurred. Please try again.');
            });
    };

    return (
        <SafeAreaView>
            <Stack.Screen options={{ title: 'Присъедини се', headerLeft: () => <BackButton /> }} />
            <YGroup gap={5} paddingHorizontal={15}>
                <YGroup gap={5}>
                    <Text color={'gray'}>Код за присъединяване:</Text>
                    <Input
                        onChangeText={handleCodeChange}
                        value={code}
                        placeholder="Код за присъединяване:"
                        autoCapitalize={'none'}
                        maxLength={6}
                        textContentType="oneTimeCode"
                        disabled={success}
                        keyboardType="number-pad"
                    />
                </YGroup>
                {success &&
                    <View>
                        <YGroup gap={10}>
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
                            {showSubmitButton && <Button backgroundColor={'#bf322c'} color={'white'} onPress={joinGroup}>Продължи</Button>}
                        </YGroup>
                    </View>
                }
                {errorMsg && <Text color={'red'} paddingHorizontal={5} pt={10}>{errorMsg}</Text>}
            </YGroup>
        </SafeAreaView>
    );
}