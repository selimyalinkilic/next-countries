import { Box, Container, Flex, Grid } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../components/card'
import Layout from '../components/layout'
import PageLoader from '../components/pageLoader'
import SearchBar from '../components/searchBar'
import SearchSorting from '../components/searchSorting'
import Country from '../model/country'

const Home = ({ countries }) => {
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchChange = (val) => {
    if (val.length >= 3) setSearch(val)
    else {
      setSearch('')
      setData(countries)
    }
  }

  const handleSortingChange = (val) => {
    setSorting(val)
  }

  const searchByName = async (val) => {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/name/${val}`)
      .then((res) => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setData(res.data)
        }, 1000)
      })
  }

  const filterByRegion = async (region) => {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/region/${region}`)
      .then((res) => {
        setData([])
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          setData(res.data)
        }, 1000)
      })
  }

  useEffect(() => {
    if (sorting) filterByRegion(sorting)
    else if (search) searchByName(search)
    else setData(countries)
  }, [sorting, search])

  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex
          mt={10}
          justifyContent={{ base: 'inherit', lg: 'space-between' }}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Box w={{ base: 'full', lg: '400px' }} my="2">
            <SearchBar handleSearchChange={handleSearchChange} />
          </Box>
          <Box w={{ base: 'full', lg: '175px' }} my="2">
            <SearchSorting handleSortingChange={handleSortingChange} />
          </Box>
        </Flex>
        {loading ? (
          <PageLoader />
        ) : (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)'
            }}
            gap={{ base: 6, md: 9, lg: 12 }}
            mt={10}
          >
            {data?.map((item, index) => (
              <Card
                key={index}
                flag={item.flags.png}
                name={item.name}
                population={item.population}
                region={item.region}
                capital={item.capital}
              />
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const all = Country.all()

  const response = await Promise.all([all])

  return {
    props: {
      countries: response[0].data
    },
    revalidate: 1000
  }
}

export default Home
