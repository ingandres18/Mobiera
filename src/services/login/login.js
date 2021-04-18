import axios from "axios";

export const loginService = {
    getUser
}

async function getUser() {

        return (await axios.get("http://localhost:3000/users")).data
        
}