import decode from 'jwt-decode';

class AuthService {
  getUser() {
    return (decode(this.getToken())).data;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    alert("login successful");
    window.location.assign('/user');
  }

  register(idToken) {
    localStorage.setItem('id_token', idToken);
    alert("Register successful");
    // window.location.assign('/login');
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.replace('/');
  }
}

export default new AuthService();
