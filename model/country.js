import instance from '../services/axios'
const path = process.env.NEXT_PUBLIC_API_URL

class Country {
  static async all() {
    return await instance.get(`${path}/all`)
  }
}

export default Country
