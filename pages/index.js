import { Container, Flex, Grid } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import Card from '../components/card'
import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import Country from '../model/country'

const Home = ({ countries }) => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const handleSearchChange = (val) => {
    if (val.length >= 3) setSearch(val)
    else {
      setSearch('')
      setData(countries)
    }
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

  useEffect(() => {
    if (search) searchByName(search)
    else setData(countries)
  }, [search])

  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex mt={10}>
          <SearchBar handleSearchChange={handleSearchChange} />
        </Flex>
        {loading ? (
          <Spinner color="red.500" />
        ) : (
          <Grid templateColumns="repeat(4, 1fr)" gap={12} mt={10}>
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
