module.exports = (item) => {
    const allowed = ['Ailment','Description','Effects_x','Effects_y','Flavor','Strain','Type']
    let filtered = Object.keys(item)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {})
        console.log(filtered)
        return filtered 
}

