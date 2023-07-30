class APIFeatures {
    constructor(qurey,queryString){
      this.query = qurey;
      this.queryString = queryString;
    }
  
    filter(){
      const qureyObj = {...this.queryString};
      const excludeFields = ["page","sort","limit","fields"];
      excludeFields.forEach(ele=>{delete qureyObj[ele]});
      // console.log(req.query," & ", qureyObj);
  
      //1B) advance Filtering
      let queryString = JSON.stringify(qureyObj); 
      queryString = queryString.replace(/\b(gte|gt|lte|le)\b/g,ele=>`$${ele}`)
  
      console.log("query String===> ",JSON.parse(queryString));
  
      this.query = this.query.find(JSON.parse(queryString));
      return this;
    }
  
    sort(){
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query =this.query.sort(sortBy);
      }else{
        this.query =this.query.sort('-titile');
      }
      return this;
    }
  
    limit(){
      if(this.queryString.fields){
        const fieldsLimit = this.queryString.fields.split(',').join(" ");
        this.query = this.query.select(fieldsLimit);
      }else{
        this.query = this.query.select("-__v");
      }
      return this;
    }
  
    paginate(){
      const page = this.queryString.page*1 || 1;
      const limit = this.queryString.limit*1 || 100;
      const skip = (page -1)*limit;
  
      this.query = this.query.skip(skip).limit(limit);
      
      
  
      return this;
    }
  }

  module.exports = APIFeatures;