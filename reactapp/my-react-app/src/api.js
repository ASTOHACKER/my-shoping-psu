import { apiRequest, authHeaders, API_URL } from "./component/api";

const api = {
  get: async (path, options = {}) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const data = await apiRequest(cleanPath, options);
    return { data };
  },
  post: async (path, body, options = {}) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const data = await apiRequest(cleanPath, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    });
    return { data };
  },
  put: async (path, body, options = {}) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const data = await apiRequest(cleanPath, {
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    });
    return { data };
  },
  delete: async (path, options = {}) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const data = await apiRequest(cleanPath, {
      method: "DELETE",
      ...options,
    });
    return { data };
  },
};

export default api;
export { apiRequest, authHeaders, API_URL };
