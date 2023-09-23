const DEFAULT_PAGE_LIMIT = 5; //Mongodb returns all the documents if limit is set to Zero(0).
const DEFAULT_PAGE_NUMBER = 1;

 function query(query){ //calculates skip
    try{
        const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER
        const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT
        const skip = (page - 1) * limit

        return {skip,limit}
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports = query;