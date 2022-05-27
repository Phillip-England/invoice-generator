const fireOnCondition = (condition, options) => {
    console.log(condition)
    if (condition == true){
        if (options.trueFunctions){
            Object.values(options.trueFunctions).forEach(func => {
                func()
            })
        }
    } else {
        if (options.falseFunctions){
            Object.values(options.falseFunctions).forEach(func => {
                func()
            })
        }  
    }
}