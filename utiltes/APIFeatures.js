/** @format */

class APIFEeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    console.log(this.queryString);
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    const queryObj = { ...this.queryString };
    exludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      match => `$${match}`
    );
    // query filter
    this.query = this.query.find(JSON.parse(queryStr));
    // this.query = this.query.find({ 'types.type.name': 'grass' });
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sort = this.queryString.sort.replaceAll(',', ' ');
      console.log(sort);
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  fieldsLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replaceAll(',', ' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFEeatures;
