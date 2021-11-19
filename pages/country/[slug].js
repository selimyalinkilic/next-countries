import { Button } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Box, Container, Flex, Grid, Heading, Text } from '@chakra-ui/layout'
import Layout from '../../components/layout'
import Country from '../../model/country'
import { useRouter } from 'next/router'
import { useColorMode } from '@chakra-ui/color-mode'

const Detail = ({ country }) => {
  const router = useRouter()
  const { colorMode } = useColorMode()
  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex mt={10}>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="gray"
            variant="outline"
            onClick={() => router.push('/')}
          >
            Back
          </Button>
        </Flex>
        <Flex
          justifyContent={{ base: 'inherit', lg: 'space-between' }}
          mt={10}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box flex="1" mr={{ lg: '4' }} my="2">
            <Image
              src={country.flags.png}
              alt={country.name}
              loading="lazy"
              width={{ base: 'full', lg: 'md' }}
              height={{ base: '48', lg: 'sm' }}
              objectFit="cover"
            />
          </Box>
          <Box flex="1" my="2">
            <Heading mt={{ base: 4, lg: 6 }}>{country.name}</Heading>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
              gap={{ base: 2, lg: 4 }}
              mt={6}
            >
              <Box>
                <Text>
                  <strong>Native Name : </strong> {country.nativeName}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Population : </strong>{' '}
                  {country.population.toLocaleString()}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Region : </strong> {country.region}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Sub Region : </strong> {country.subregion}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Capital : </strong> {country.capital}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Languages : </strong>{' '}
                  {country.languages.map((item, index) => (
                    <Text
                      key={index}
                      as="span"
                      p={2}
                      boxShadow="sm"
                      mx="1"
                      fontSize="xs"
                      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                      borderRadius="md"
                    >
                      {item.name}
                    </Text>
                  ))}
                </Text>
              </Box>
              <Box>
                <Text>
                  <strong>Currencies : </strong>{' '}
                  {country.currencies ? country.currencies[0].name : '-'}
                </Text>
              </Box>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const all = Country.all()

  const res = await Promise.all([all])
  return {
    paths: res[0].data.map((item) => {
      return { params: { slug: `${item.alpha2Code}` } }
    }),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // data fetch
  const getByAlpha = Country.getByAlpha(params.slug)

  const result = await Promise.all([getByAlpha])
  const data = result[0].data
  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      country: data
    }
  }
}

export default Detail
