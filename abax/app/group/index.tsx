import React, { useState, useContext } from 'react'
import { View, Text, YStack, ScrollView, Button } from 'tamagui'
import { Entypo } from '@expo/vector-icons';
import { PostsContext } from '@/context/PostsContext';

const Post = ({ title, content, date, uploader }: any) => {
  const localDate = new Date(date).toLocaleString('bg', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
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
        {localDate}
      </Text>
      <Text color="#555" fontSize={14} marginTop={10}>
        Качено от: {uploader}
      </Text>
    </YStack>
  )
}

const Index = () => {
  const posts = useContext(PostsContext);

  return (
    <ScrollView padding={20}>
      <Text fontSize={20} fontWeight={'bold'} paddingBottom={10}>Новини</Text>
      {posts?.map(post => (
        <Post key={post.id} title={post.title} content={post.description} date={post.updatedAt} uploader={post.uploaderName} />
      ))}
    </ScrollView>
  )
}

export default Index