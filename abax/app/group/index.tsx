import React from 'react'
import { View, Text, YStack, ScrollView, Button } from 'tamagui'
import { Entypo } from '@expo/vector-icons';

// Dummy data
const posts = [
  {
    id: 1,
    title: "Group Meeting",
    content: "There will be a group meeting on Monday at 10 AM.",
    date: "2024-05-20",
    time: "10:00"
  },
  {
    id: 2,
    title: "Project Update",
    content: "The project has been updated with new requirements.",
    date: "2024-05-22",
    time: "14:00"
  },
  {
    id: 3,
    title: "Maintenance Notice",
    content: "The system will undergo maintenance on Friday.",
    date: "2024-05-24",
    time: "18:00"
  }
]

const Post = ({ title, content, date, time }:any) => {
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
    </YStack>
  )
}

const Index = () => {
  return (
    <ScrollView padding={20}>
      <Button alignSelf="center" icon={<Entypo name="plus" size={24} color="#fff" />} size="$6" backgroundColor={'#bf322c'} color={'#fff'} marginBottom={10}>Добави известие</Button>
      {posts.map(post => (
        <Post key={post.id} title={post.title} content={post.content} date={post.date} time={post.time} />
      ))}
    </ScrollView>
  )
}

export default Index