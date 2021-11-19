import { useColorMode } from '@chakra-ui/color-mode'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import Link from 'next/link'

const Card = ({ flag, name, population, region, capital, alpha2Code }) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      boxShadow="base"
      rounded="md"
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      _hover={{ boxShadow: '2xl', transition: 'all ease .3s' }}
    >
      <Link href={`/country/${alpha2Code}`}>
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
            <Heading as="h2" size="sm" colorScheme="gray" mb="2">
              {name}
            </Heading>
            <Flex mt="2">
              <Text fontWeight="bold" colorScheme="gray" fontSize="smaller">
                Population :
              </Text>
              <Text colorScheme="gray" fontSize="smaller" ms="2">
                {population.toLocaleString()}
              </Text>
            </Flex>
            <Flex mt="2">
              <Text fontWeight="bold" colorScheme="gray" fontSize="smaller">
                Region :
              </Text>
              <Text colorScheme="gray" fontSize="smaller" ms="2">
                {region}
              </Text>
            </Flex>
            <Flex mt="2">
              <Text fontWeight="bold" colorScheme="gray" fontSize="smaller">
                Capital :
              </Text>
              <Text colorScheme="gray" fontSize="smaller" ms="2">
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
