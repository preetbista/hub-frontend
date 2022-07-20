import axios from "axios"
import { getToken } from "../auth/AuthUtil"

const listRole =() => {
    return axios({
        url  : "http://localhost:8080/roles",
        method :"GET",
        headers :{
            Authorization: getToken()
        }
    })
}

export default listRole