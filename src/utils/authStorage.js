import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );
    return token ? String(token) : undefined;
  }

  async setAccessToken(accessToken) {
    if (accessToken) {
      await AsyncStorage.setItem(
        `${this.namespace}:token`, String(accessToken)
      );
    } else {
      throw new Error('Access token must not be undefined.');
    }
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;