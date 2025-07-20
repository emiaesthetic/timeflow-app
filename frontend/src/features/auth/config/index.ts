export const API_URL = {
  root: 'http://localhost:5000/api/v1',

  auth: function (url = '') {
    return `${this.root}/auth/${url}`;
  },

  users: function (url = '') {
    return `${this.root}/users/${url}`;
  },

  tasks: function (url = '') {
    return `${this.root}/tasks/${url}`;
  },
};

export const GITHUB_AUTH_URL = {
  root: 'https://github.com/login/oauth',
  clientId: import.meta.env.VITE_CLIENT_ID || '',

  auth: function () {
    return `${this.root}/authorize?client_id=${this.clientId}&redirect_uri=http://localhost:5173/auth/oauth`;
  },
};
