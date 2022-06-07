import { trackPromise } from "react-promise-tracker";
import { roles } from "../../Constant";
import Service from "./Service";

class AuthApiService extends Service {
  constructor() {
    super("api");
  }

  login(username, password) {
    let status = 401;
    let role = "";
    if (username == "admin" && password == "admin") {
      status = 200;
      role = roles.admin;
    }
    if (username == "user" && password == "user") {
      status = 200;
      role = roles.user;
    }
    return trackPromise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: status,
            role: role,
          });
        }, 1500);
      })
    );
  }
}

export default new AuthApiService();
