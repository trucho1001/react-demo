import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { eraseCookie, getCookie } from "../utils/Utils";

export default class Service {
  constructor(path, baseURL) {
    if (!baseURL) {
      baseURL = "/";
    }
    if (path) {
      baseURL += path;
    }
    this.service = this.axiosInstance(baseURL);
    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  axiosInstance(baseURL) {
    let headers = {};
    let service = axios.create({
      baseURL,
      headers: headers,
    });
    service.defaults.headers.common["Accept"] =
      "application/json;charset=UTF-8";
    service.defaults.headers.common["Content-Type"] =
      "application/json;charset=UTF-8";
    return service;
  }

  handleSuccess(response) {
    // if (response.data && response.data.isSuccess === false) {
    //   SnackbarUtils.error("Error!");
    // }
    return response;
  }

  handleError = async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const result = await this.axiosInstance().post(
          `api/authenticate/RefreshToken`
        );
        if (result) {
          if (getCookie("jwToken"))
            originalRequest.headers.Authorization =
              "Bearer " + getCookie("jwToken");
          return await axios.request(originalRequest);
        }
      } catch (err) {
        console.log(err);
        eraseCookie("jwToken");
        eraseCookie("refreshToken");
        this.redirectTo(document, "/");
      }
    }
    switch (error.response.status) {
      case 401:
        // this.redirectTo(document, "/");
        break;
      case 404:
        // this.redirectTo(document, "/404");
        break;
      case 400:
      case 500:
        // SnackbarUtils.error("Error!");
        // this.redirectTo(document, "/500");
        break;
      default:
        // this.redirectTo(document, "/500");
        break;
    }
    // SnackbarUtils.error("Error!");
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  async get(path, callback) {
    const response = await trackPromise(this.service.get(path));
    return callback(response.status, response.data);
  }

  async getWithoutTracker(path, callback) {
    const response = await this.service.get(path);
    return callback(response.status, response.data);
  }

  async patch(path, payload, callback) {
    const response = await this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload,
    });
    return callback(response.status, response.data);
  }

  async post(path, payload, callback) {
    const response = await trackPromise(
      this.service.request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
    );
    return callback(response.status, response.data);
  }

  async put(path, payload, callback) {
    const response = await trackPromise(
      this.service.request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
      })
    );
    return callback(response.status, response.data);
  }

  async delete(path, callback) {
    const response = await trackPromise(
      this.service.request({
        method: "DELETE",
        url: path,
        responseType: "json",
      })
    );
    return callback(response.status, response.data);
  }
}
