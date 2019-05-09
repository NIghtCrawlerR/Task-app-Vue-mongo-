import axios from 'axios';

const url = 'http://localhost:5000/api/routes/';

class Service {
    //get
    static getCards() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(card => ({
                        ...card
                    }))
                )
            } catch (err) {
                reject(err)
            }
        })
    }
    static getCardContent(id) {
       // return axios.get(`${url}${id}`)
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const res = await axios.get(`${url}${id}`)
        //         const data = res.data
        //         resolve(data)
        //     } catch(err) {
        //         reject(err)
        //     }
        // })
    }
    //create

    static createCard(data) {
        return axios.post(url, {
            data
        })
    }
    //delete
    static deleteCard(id) {
        return axios.delete(`${url}${id}`)
    }

    //update
}

export default Service