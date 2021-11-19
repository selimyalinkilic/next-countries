import { Flex, Text } from '@chakra-ui/layout'

const PageMessage = ({ children }) => {
  return (
    <Flex width="full" my="10" justifyContent="center">
      <Text
        colorScheme="gray"
        fontSize={{ base: 'md', lg: '3xl' }}
        as="h1"
        fontWeight="bolder"
      >
        {children}
      </Text>
    </Flex>
  )
}

export default PageMessage
