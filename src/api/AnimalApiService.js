import Service from "./Service";

class AnimalApiService extends Service {
  constructor() {
    super("");
  }

  async getAnimals() {
    let result = await this.get(
      `https://629836b0f2decf5bb73d67d4.mockapi.io/animals`,
      (status, data) => {
        return data;
      }
    );
    return result;
  }

  async addAnimal(payload) {
    let result = await this.post(
      `https://629836b0f2decf5bb73d67d4.mockapi.io/animals`,
      payload,
      (status, data) => {
        return data;
      }
    );
    return result;
  }

  async updateAnimal(id, payload) {
    let result = await this.put(
      `https://629836b0f2decf5bb73d67d4.mockapi.io/animals/${id}`,
      payload,
      (status, data) => {
        return data;
      }
    );
    return result;
  }

  async deleteAnimal(id) {
    let result = await this.delete(
      `https://629836b0f2decf5bb73d67d4.mockapi.io/animals/${id}`,
      (status, data) => {
        return data;
      }
    );
    return result;
  }
}

export default new AnimalApiService();
