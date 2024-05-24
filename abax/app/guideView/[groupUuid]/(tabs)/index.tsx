import React, { useEffect, useState } from 'react';
import { View, Text, YStack, ScrollView, Button } from 'tamagui';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {
  Adapt,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui';
import { useLocalSearchParams } from 'expo-router';

// Dummy data
const posts = [
  {
    id: 1,
    title: "Group Meeting",
    content: "There will be a group meeting on Monday at 10 AM.",
    date: "2024-05-20",
    time: "10:00",
    uploader: "John Doe"
  },
  {
    id: 2,
    title: "Project Update",
    content: "The project has been updated with new requirements.",
    date: "2024-05-22",
    time: "14:00",
    uploader: "John Doe"
  },
  {
    id: 3,
    title: "Maintenance Notice",
    content: "The system will undergo maintenance on Friday.",
    date: "2024-05-24",
    time: "18:00",
    uploader: "John Doe"
  }
]

const Post = ({ title, content, date, time, uploader }: any) => {
  return (
    <YStack
      borderColor="#ddd"
      borderWidth={1}
      borderRadius={10}
      padding={10}
      marginBottom={10}
      width="100%"
    >
      <Text fontWeight="bold" fontSize={18} marginBottom={5}>
        {title}
      </Text>
      <Text fontSize={16} marginBottom={5}>
        {content}
      </Text>
      <Text color="#555" fontSize={14}>
        {date} at {time}
      </Text>
      <Text color="#555" fontSize={14} marginTop={10}>
        Uploader: {uploader}
      </Text>
    </YStack>
  )
}

const DialogInstance = (groupUuid:any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  useEffect(() => {
    if (title.length > 2 && description.length > 4) {
      // Make the API request with the code
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }, [title, description]);

  const createPost = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    setIsSubmitting(true); // Set submitting state to true
    // Make the API request here using the code
    // Example:
    fetch(`https://5e98-149-62-207-222.ngrok-free.app/api/guides/add_post`, {
      method: 'POST',
      body: JSON.stringify({ title, description, groupUuid:groupUuid.groupUuid }),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Ensure content type is set
      },
    })
      .then(response => response.json())
      .then(data => {
        setIsSubmitting(false); // Reset submitting state
        // Handle the API response
        console.log(data);
        if (data.success) {
          setTitle('');
          setDescription('');
          // Close the dialog
          setErrorMsg('');
        } else {
          setErrorMsg(data.message);
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
        setErrorMsg('An error occurred. Please try again.');
        setIsSubmitting(false); // Reset submitting state
      });
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button alignSelf="center" icon={<Entypo name="plus" size={24} color="#fff" />} size="$6" backgroundColor={'#bf322c'} color={'#fff'} marginBottom={10}>
          Добави известие
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Добави известие</Dialog.Title>
          <Dialog.Description>
            Попълни полетата за да добавиш ново известие. Туристите ще бъдат известени!
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="title">
              Заглавие
            </Label>
            <Input flex={1}
              onChangeText={handleTitleChange}
              value={title}
              placeholder="Заглавие:"
              autoCapitalize={'sentences'}
              keyboardType="default"
            />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="content">
              Съобщение
            </Label>
            <Input size="$4" borderWidth={2} flex={1}
              onChangeText={handleDescriptionChange}
              defaultValue={description}
              placeholder="Съобщение:"
              autoCapitalize={'sentences'}
              keyboardType="default"
              height={100}
              multiline={true}
            />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            {showSubmitButton && <Button theme="active" aria-label="Close" onPress={createPost} disabled={isSubmitting}>
              {isSubmitting ? 'Изпращане...' : 'Изпрати'}
            </Button>}
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={<Feather name="x" size={24} color="black" />}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

const Index = () => {
  const { groupUuid } = useLocalSearchParams();
  return (
    <ScrollView padding={20}>
      <DialogInstance groupUuid={groupUuid}/>
      {posts.map(post => (
        <Post key={post.id} title={post.title} content={post.content} date={post.date} time={post.time} uploader={post.uploader} />
      ))}
    </ScrollView>
  )
}

export default Index;
