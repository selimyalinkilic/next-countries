import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import Link from 'next/link'

const Card = ({ flag, name, population, region, capital }) => {
  return (
    <Box
      boxShadow="base"
      rounded="md"
      bg="white"
      _hover={{ boxShadow: '2xl', transition: 'all ease .3s' }}
    >
      <Link href="/">
        <a>
          <Image
            objectFit="cover"
            src={flag}
            alt={name}
            loading="lazy"
            width="100%"
            height="138px"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
          />
          <Flex p={6} flexDirection="column">
            <Heading as="h2" size="sm" color="gray.800" mb="2">
              {name}
            </Heading>
            <Flex mt="2">
              <Text fontWeight="bold" color="gray.800" fontSize="smaller">
                Population :
              </Text>
              <Text color="gray.800" fontSize="smaller" ms="2">
                {population.toLocaleString()}
              </Text>
            </Flex>
            <Flex mt="2">
              <Text fontWeight="bold" color="gray.800" fontSize="smaller">
                Region :
              </Text>
              <Text color="gray.800" fontSize="smaller" ms="2">
                {region}
              </Text>
            </Flex>
            <Flex mt="2">
              <Text fontWeight="bold" color="gray.800" fontSize="smaller">
                Capital :
              </Text>
              <Text color="gray.800" fontSize="smaller" ms="2">
                {capital}
              </Text>
            </Flex>
          </Flex>
        </a>
      </Link>
    </Box>
  )
}

export default Card
