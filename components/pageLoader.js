import { Grid } from '@chakra-ui/layout'
import SkeletonLoader from './skeletonLoader'
const PageLoader = () => {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)'
      }}
      gap={{ base: 6, md: 9, lg: 12 }}
      my={10}
    >
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </Grid>
  )
}

export default PageLoader
