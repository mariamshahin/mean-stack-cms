import logger from './LoggerService';

export default class MongooseService {
  /**
   * @description Create an instance of the MongooseService class
   * @param model {mongoose.model} Mongoose Model to use for the instance
   */
  constructor(model) {
    this.model = model;
    this.logger = logger;
  }

  /**
   * @description Create a new document from the Model
   * @param body {object} Body object to create the new document with
   * @returns {Promise} Returns the results of the query
   */
  create(body) {
    const Model = this.model;
    const modelInstance = new Model(body);
    return modelInstance.save();
  }

  /**
   * @description Retrieve all documents from the Model
   * @returns {Promise} Returns the results of the query
   */
  findAll() {
    return this.model.find().exec();
  }

  /**
   * @description Retrieve a single document matching the provided ID, from the Model
   * @param id {string} Required: ID for the object to retrieve
   * @returns {Promise} Returns the results of the query
   */
  findById(id) {
    return this.model.findById(id).exec();
  }

  /**
   * @description Retrieve all documents matching the provided keys, from the Model
   * @param obj {object} Required: key and value for the object to retrieve
   * @returns {Promise} Returns the results of the query
   */
  find(obj) {
    return this.model.find(obj).exec();
  }

  /**
   * @description Retrieve a single document matching the provided keys, from the Model
   * @param obj {object} Required: key and value for the object to retrieve
   * @returns {Promise} Returns the results of the query
   */
  findOne(obj) {
    return this.model.findOne(obj).exec();
  }

  /**
   * @description Retrieve a single document matching the provided ID, from the Model
   * @param id {string} Required: ID for the object to retrieve
   * @param ref {string} Required: reference in the model to populate
   * @returns {Promise} Returns the results of the query
   */
  findByIdAndPopulate(id, ref) {
    return this.model.findById(id).populate(ref).exec();
  }

  /**
   * @description Update a document matching the provided ID, with the body
   * @param id {string} ID for the document to update
   * @param body {object} Body to update the document with
   * @returns {Promise} Returns the results of the query
   */
  updateOne(id, body) {
    return this.model.findByIdAndUpdate(id, body).exec();
  }

  /**
   * @description Update all documents that matchin, with the body
   * @param obj {obj} object to search in the dicuments
   * @param body {object} Body to update the document with
   * @returns {Promise} Returns the results of the query
   */
  updateMany(obj, body) {
    return this.model.updateMany(obj, body).exec();
  }

  /**
   * @description Delete an existing document on the Model
   * @param id {string} ID for the object to delete
   * @returns {Promise} Returns the results of the query
   */
  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }

  /**
   * @description Count the number of all documents from a Model
   * @returns {Promise} Returns the results of the query
   */
  count() {
    return this.model.find().countDocuments();
  }
}
