import axios from 'axios'


const Home = {
    getTribus(){
        return axios(`home/get-tribus`)
    },
}

export default Home
