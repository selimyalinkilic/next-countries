import { Container, Grid } from '@chakra-ui/layout'
import Card from '../components/card'
import Layout from '../components/layout'
import Country from '../model/country'

const Home = ({ countries }) => {
  return (
    <Layout>
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(4, 1fr)" gap={12} mt={10}>
          {countries?.map((item, index) => (
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
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data = Country.all()
  const response = await Promise.all([data])

  return {
    props: {
      countries: response[0].data
    },
    revalidate: 1000
  }
}

export default Home
