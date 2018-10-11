import axios from "axios";

const API_URL = "someurl";

export const API = {
    getPublicks: () => axios.get(API_URL, authHeader())
}

const authHeader = () => {
    return {

    }
}