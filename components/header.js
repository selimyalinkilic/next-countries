import { Heading } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      height={[16, 18, 24]}
      boxShadow="sm"
      justifyContent="space-between"
      alignItems="center"
      px={[4, 8, 16]}
    >
      <Heading
        as="h1"
        fontSize={['xl', '2xl', '3xl', '4xl']}
        color={colorMode === 'dark' ? 'gray.100' : 'gray.500'}
      >
        &#123; Next Countries &#125;
      </Heading>
      <IconButton
        bg="transparent"
        color={colorMode === 'dark' ? 'gray.100' : 'gray.500'}
        _hover={{
          backgroundColor: colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.100',
          color: colorMode === 'dark' ? 'gray.300' : 'gray.500'
        }}
        aria-label="Change Color Mode"
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default Header
