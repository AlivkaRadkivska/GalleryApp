class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        const queryObj = { ...this.queryStr };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryString = JSON.stringify(queryObj);
        queryString = JSON.parse(queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));

        this.query = this.query.find(queryString);

        return this;
    }

    sort() {
        if (this.queryStr.sort)
            this.query = this.query.sort(this.queryStr.sort);

        return this;
    }

    paginate() {
        if (this.queryStr.page) {
            const page = this.queryStr.page * 1 || 1;
            const limit = this.queryStr.page * 1 || 100;
            const skip = (page - 1) * limit;

            this.query = this.query.skip(skip).limit(limit);
        }

        return this;
    }
}

module.exports = APIFeatures;