import Service from "./Service";

class AuthApiService extends Service {
  constructor() {
    super("api");
  }

  login(username, password, returnUrl) {
    this.post(
      `/authenticate`,
      {
        username: username,
        password: password,
      },
      (status, data) => {
        // console.log("****** response is *******", status, data);
        // document.location = data.redirectUrl;
        document.location = "/train/admin/overview";
      }
    );
  }
}

export default new AuthApiService();
