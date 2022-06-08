import { trackPromise } from "react-promise-tracker";
import { roles, users } from "../Constant";
import Service from "./Service";

class AuthApiService extends Service {
  constructor() {
    super("api");
  }

  login(username, password) {
    let status = 401;
    let existed = users.find(
      (item) => item.username == username && item.password == password
    );
    if (existed) {
      status = 200;
    }
    return trackPromise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: status,
            user: existed,
          });
        }, 1500);
      })
    );
  }

  register(payload) {
    return trackPromise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            payload: payload,
          });
        }, 1500);
      })
    );
  }
}

export default new AuthApiService();
