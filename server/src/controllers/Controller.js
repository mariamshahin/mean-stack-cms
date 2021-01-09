import { status } from '../utils/constants';

export default class Controller {
  /**
   * @description Create an instance of the Controller class
   * @param modelName {mongoose.model.modelName} Mongoose Model name to use for the instance
   */
  constructor(modelName) {
    this.modelName = modelName;
  }

  /**
   * @description return a create resourse success response
   * @param res {object} Express response object
   * @returns {Object} Returns Express response
   */
  created(res) {
    return res.status(status.OK).json({
      message: `${this.modelName} created successfully!`,
    });
  }

  /**
   * @description return an update resourse success response
   * @param res {object} Express response object
   * @returns {Object} Returns Express response
   */
  updated(res) {
    return res.status(status.OK).json({
      message: `${this.modelName} updated successfully!`,
    });
  }

  /**
   * @description return a delete resourse success response
   * @param res {object} Express response object
   * @returns {Object} Returns Express response
   */
  deleted(res) {
    return res.status(status.OK).json({
      message: `${this.modelName} deleted successfully!`,
    });
  }

  /**
   * @description return a found resourse success response
   * @param res {object} Express response object
   * @param data {object} result returned from data access
   * @returns {Object} Returns Express response
   */
  found(res, data) {
    return res.status(status.OK).json({
      data,
    });
  }

  /**
   * @description Create a not found response with message
   * @param res {object} Express response object
   * @returns {Object} Returns Express response
   */
  notFound(res) {
    return res.status(status.NOT_FOUND).json({
      message: `${this.modelName} not found!`,
    });
  }

  /**
   * @description Create a forbidden response with message
   * @param res {object} Express response object
   * @returns {Object} Returns Express response
   */
  forbidden(res) {
    return res.status(status.FORBIDDEN).json({
      error: 'Not authorized!',
    });
  }

  /**
   * @description Create a fail response with message
   * @param res {object} Express response object
   * @param error {object} error returned from data access
   * @returns {Object} Returns Express response
   */
  failed(res, error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
}
