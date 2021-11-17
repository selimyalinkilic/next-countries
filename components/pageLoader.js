import { useColorMode } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

const PageLoader = () => {
  const { colorMode } = useColorMode()
  return (
    <Flex justifyContent="center" my="10">
      <Spinner
        color={colorMode === 'dark' ? 'gray.100' : 'gray.500'}
        size="lg"
      />
    </Flex>
  )
}

export default PageLoader
