export class LocalStorage {
  static makeValue(value) {
    return JSON.stringify({value});
  }

  static getValue(value) {
    if (value) {
      const parsedValue = JSON.parse(value);
      return parsedValue.value;
    } else {
      return '';
    }
  }

  static setItem(key, value) {
    localStorage.setItem(key, LocalStorage.makeValue(value));
  }

  static getItem(key) {
    return LocalStorage.getValue(localStorage.getItem(key));
  }

  static clearStore() {
    localStorage.clear();
  }

  static setStore(data) {
    for (let key of Object.keys(data)) {
      LocalStorage.setItem(key, data[key]);
    }
  }
}
