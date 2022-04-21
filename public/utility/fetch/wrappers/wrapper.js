
//used to shorten fetch requests
const fetchWrapper = async (url, method) => {
    try {
        const response = await fetch(url, {
            method: method
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error.message)
    }
}