function filter(req, res, next) {
    const allowed = ['Ailment','Description','Effects_x','Effects_y','Flavor','Rating','Strain','Type']
    req.body = Object.keys(req.body)
        .filter(key => allowed.includes(key))
        .reduce((obj,key) => {
            return {
                ...obj,
                [key]: req.body[key]
            }
        })
        console.log(filtered)
        return filtered
}