import { Box } from '@chakra-ui/layout'
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton'
import { useColorMode } from '@chakra-ui/color-mode'

const SkeletonLoader = () => {
  const { colorMode } = useColorMode()
  return (
    <Box
      boxShadow="base"
      rounded="md"
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
    >
      <Skeleton
        height="138px"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      ></Skeleton>
      <SkeletonText mt="4" noOfLines={4} spacing="4" p={6} />
    </Box>
  )
}

export default SkeletonLoader
