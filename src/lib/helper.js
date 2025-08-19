import axios from 'axios';

export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_KEY  = "auth_user";

const instance = axios.create({
  baseURL: 'http://89.116.23.191/api',
  timeout: 95000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const Helper = {
  Get: async (url) => {
    return instance
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  Get_Abort: async ({ url, data = null, signal }) => {
    return instance
      .get(url, {
        params: data || {},
        signal: signal,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  Post: async ({ url, data = null }) => {
    return instance
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          throw error.response;
        }
        throw error;
      });
  },
  Put: async ({ url, data = null }) => {
    // data = { ...data, _method: 'PUT' };
    return instance
      .put(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  Delete: async ({ url, data = null }) => {
    return instance
      .delete(url, {
        data: data,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('State', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('State');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};
