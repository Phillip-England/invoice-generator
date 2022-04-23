
//this function will help us get a specific url based off our NODE_ENV
//midURL is our URL without the additions at the end (midURL must contain slashes at start, but not at end)
//the additions are variables (most commononly _id values)
//additions must be an object
const getURL = (NODE_ENV, midURL, additions) => {
    let baseURL //will contain the start of our url, which is different for production and development
    let URLWithoutAdditions //will hold our url without the additions added on
    let URLWithAdditions
    if (NODE_ENV == 'development'){
        baseURL = 'http://localhost:5000'
    } else {
        //production baseURL goes here
    }
    URLWithoutAdditions = baseURL + midURL //combining our baseURL and our midURL
    //checking to see if additions have been provided
    //if they have not, simply return the url without additions
    if (additions == undefined) {
        return URLWithoutAdditions
    }
    //looping through our additions and adding them to our url
    Object.values(additions).forEach(value => {
        URLWithAdditions = URLWithoutAdditions + '/' + value
    })
    //finally, return our URL with its additions
    return URLWithAdditions
}