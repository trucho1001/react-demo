import Service from "./Service";

class AlgoliaApiService extends Service {
  constructor() {
    super("api");
  }

  async getAll(keyword) {
    let result = await this.get(
      `https://hn.algolia.com/api/v1/search?query=${keyword}`,
      (status, data) => {
        return data;
      }
    );
    return result;
  }
}

export default new AlgoliaApiService();
