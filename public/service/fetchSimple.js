const fetchSimple = async (options) => {
    console.log(options)
    let response = await fetch(options.url, {
        method: options.method,
        body: options.body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    let data = await response.json()
    return data
}