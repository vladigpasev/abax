import type { CardProps } from 'tamagui'
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui'

interface OfferCardProps extends CardProps {
  title: string;
  description: string;
  imageUri: string;
}

export function OfferCard({ title, description, imageUri, ...props }: OfferCardProps) {
    return (
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded>
          <H2 paddingBottom={10}>{title}</H2>
          <Paragraph theme="alt2">{description}</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$10" backgroundColor='#E3321E' color='white'>Виж офертата</Button>
        </Card.Footer>
        <Card.Background>
            <Image
                resizeMode="cover"
                alignSelf="stretch"
                borderRadius={5}
                opacity={0.1}
                //@ts-ignore
                source={{
                    width: '100%',
                    height: '100%',
                    uri: imageUri,
                }}
            />
        </Card.Background>
      </Card>
    )
}