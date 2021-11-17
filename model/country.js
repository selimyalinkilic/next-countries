import instance from '../services/axios'
const path = process.env.NEXT_PUBLIC_API_URL

class Country {
  static async all() {
    return await instance.get(`${path}/all`)
  }
  static async getByName(name) {
    return await instance.get(`${path}/name/${name}`)
  }
}

export default Country
