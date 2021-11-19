import { Box, Container, Flex, Grid } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../components/card'
import Layout from '../components/layout'
import PageLoader from '../components/pageLoader'
import SearchBar from '../components/searchBar'
import SearchSorting from '../components/searchSorting'
import Country from '../model/country'
import Head from 'next/head'

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
    setLoading(true)
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/name/${val}`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
  }

  const filterByRegion = async (region) => {
    setLoading(true)
    setData([])
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/region/${region}`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
      })
  }

  useEffect(() => {
    if (!data && !sorting && !search && !countries) {
      setLoading(true)
    } else {
      setLoading(false)
    }

    if (sorting) filterByRegion(sorting)
    else if (search) searchByName(search)
    else setData(countries)
  }, [sorting, search])

  return (
    <Layout>
      <Head>
        <title>Next Countries</title>
      </Head>
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
            my={10}
          >
            {data
              ?.filter((item) => item.alpha2Code !== null)
              .map((item, index) => (
                <Card
                  key={index}
                  flag={item.flags.png}
                  name={item.name}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                  alpha2Code={item.alpha2Code}
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

  let response = await Promise.all([all])

  return {
    props: {
      countries: response[0].data
    },
    revalidate: 1
  }
}

export default Home
