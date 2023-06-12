class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.queryParams;
    this.queryObj = {};
  }

  filter() {
    let queryObj = { ...this.queryStr };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'next_page',
      'prev_page',
      'max_pages',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    queryObj = Object.fromEntries(Object.entries(queryObj).filter(([_, v]) => v != ''));

    this.queryObj = queryObj;

    let queryString = JSON.stringify(queryObj);
    queryString = JSON.parse(
      queryString.replace(/\b(gte|gt|lte|lt|all)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(queryString);
    this.queryParams = queryString;

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort);
      this.queryObj.sort = this.queryStr.sort;
    } else {
      this.query = this.query.sort('-adding_date');
    }

    return this;
  }

  paginate() {
    let page = this.queryStr.page || 1;
    if (this.queryStr.next_page && page < this.queryStr.max_pages) page++;
    if (this.queryStr.prev_page && page > 1) page--;

    const limit = 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.queryObj.page = page;
    if (this.queryStr.max_pages) this.queryObj.max_pages = this.queryStr.max_pages;

    return this;
  }
}

module.exports = APIFeatures;
