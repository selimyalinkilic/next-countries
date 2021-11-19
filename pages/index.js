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
import PageMessage from '../components/pageMessage'

const Home = ({ countries }) => {
  const [sorting, setSorting] = useState('')
  const [message, setMessage] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearchChange = (val) => {
    if (val.length >= 3) {
      setLoading(true)
      if (val) {
        setTimeout(() => {
          let searchResults = countries.filter((item) =>
            item.name.toLowerCase().includes(val)
          )
          setData(searchResults)
          setLoading(false)
          if (searchResults.length <= 0) {
            setMessage(true)
          } else {
            setMessage(false)
          }
        }, 500)
      }
    } else {
      setData(countries)
    }
  }

  const handleSortingChange = (val) => {
    setSorting(val)
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
    if (!data && !sorting && !countries) {
      setLoading(true)
    } else {
      setLoading(false)
    }

    if (sorting) filterByRegion(sorting)
    else setData(countries)
  }, [sorting])

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
        {message && loading != true ? (
          <PageMessage>Countries & Country Not Found!</PageMessage>
        ) : (
          ''
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
