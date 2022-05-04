
//this function will help us get a specific url based off our NODE_ENV
//midURL is our URL without the additions at the end (midURL must contain slashes at start, but not at end)
//the additions are variables (most commononly _id values)
//additions must be an object
const getURL = (midURL, additions) => {
    let baseURL //will contain the start of our url, which is different for production and development
    let URLWithAdditions //will hold our URL if additions are needed (like _id values attached at the end)
    let NODE_ENV = document.getElementsByTagName('body')[0].getAttribute('NODE_ENV')
    if (NODE_ENV == 'development'){
        baseURL = 'http://localhost:5000'
    } else {
        //production baseURL goes here
    }
    URLWithAdditions = baseURL + midURL //combining our baseURL and our midURL
    //checking to see if additions have been provided
    //if they have not, simply return the url without additions
    if (additions == undefined) {
        return baseURL + midURL
    }
    //looping through our additions and adding them to our url
    Object.values(additions).forEach(value => {
        URLWithAdditions = URLWithAdditions + '/' + value
    })

    //finally, return our URL with its additions
    return URLWithAdditions
}