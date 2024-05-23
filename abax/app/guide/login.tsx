import { View, Text, Button } from 'tamagui'
import React, { useEffect, useState } from 'react'
import { Input, YGroup } from 'tamagui'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const router = useRouter();

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    useEffect(() => {
        if (email.length > 2 && password.length > 5) {
            // Make the API request with the code
            setShowSubmitButton(true);
        } else {
            setShowSubmitButton(false);
        }
    }, [email, password]);

    const authenticateGuide = () => {
        // Make the API request here using the code
        // Example:
        fetch(`https://5e98-149-62-207-222.ngrok-free.app/api/guides/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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
                            await AsyncStorage.setItem('accessToken', data.token);
                            await AsyncStorage.setItem('guide', 'true');
                        } catch (e) {
                            console.log(e);
                        }
                    };
                    saveToken();
                    //router.replace('/group');
                    while (router.canGoBack()) { router.back() } router.replace("/guide/groups");
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
        <View paddingHorizontal={10} paddingVertical={10}>
            <YGroup gap={10}>
                <YGroup gap={5}>
                    <Text color={'gray'}>Имейл:</Text>
                    <Input
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Имейл:"
                        autoCapitalize={'none'}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                </YGroup>
                <YGroup gap={5}>
                    <Text color={'gray'}>Парола:</Text>
                    <Input
                        onChangeText={handlePasswordChange}
                        value={password}
                        placeholder="Парола:"
                        autoCapitalize={'none'}
                        textContentType="password"
                        secureTextEntry={true}
                        keyboardType="visible-password"
                    />
                </YGroup>
                {showSubmitButton && <Button backgroundColor={'#bf322c'} color={'white'} onPress={authenticateGuide}>Вход</Button>}
                {/* {showSubmitButton && <Button backgroundColor={'#bf322c'} color={'white'} onPress={joinGroup}>Продължи</Button>} */}
                {errorMsg && <Text color={'red'} paddingHorizontal={5} pt={10}>{errorMsg}</Text>}
            </YGroup>
        </View>
    )
}

export default Login