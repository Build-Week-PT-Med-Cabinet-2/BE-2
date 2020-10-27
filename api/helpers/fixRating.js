function fixRating (item) {
    if(Number.isInteger(item)){
        return item
    }else {
        let number = Number.parseInt(item)
        if(Number.isNaN(number)){
            return 0;
        }
        else {
            return number;
        }
    }
        
}