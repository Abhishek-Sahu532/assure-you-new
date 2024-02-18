class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log('keyword', keyword);

    this.query = this.query.find({ ...keyword });
    // console.log(this)
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter fro Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    // console.log(queryStr)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log('query from fileter', this.query)
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1); // skipping the previous shown result
    this.query = this.query.limit(resultPerPage).skip(skip);
    // console.log('query', this.query)
    return this;
  }
}

module.exports = ApiFeature;
