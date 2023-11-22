import axios, {AxiosInstance} from "axios"

const api:AxiosInstance=axios.create({
    baseURL:"https://cautious-puce-neckerchief.cyclic.app"
})
export default api