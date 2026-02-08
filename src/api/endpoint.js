const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// =================== TOKEN MANAGEMENT ===================
export const TOKEN_KEY = "token"; // ✅ Cohérent partout

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const setAuthToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeAuthToken = () => localStorage.removeItem(TOKEN_KEY);

export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const base64 = token.split('.')[1];
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return false;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// =================== HELPERS ===================
const buildUrl = (endpoint) => {
  return endpoint.startsWith('/') ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`;
};

const getHeaders = (extraHeaders = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };
  
  if (token && isTokenValid(token)) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// =================== GESTION DES ERREURS CENTRALE ===================
const handleApiError = async (response) => {
  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Session expirée. Veuillez vous reconnecter.');
  }

  let errorData;
  try {
    errorData = await response.json();
  } catch {
    errorData = { message: `Erreur HTTP ${response.status}` };
  }

  console.error("Détails de l'erreur serveur:", errorData);

  let errorMessage = errorData.message || `Erreur ${response.status}`;
  
  if (errorData.errorName === 'MongoServerError' && errorData.code === 11000) {
    errorMessage = 'Données en doublon détectées. Vérifiez les informations saisies.';
  }
  
  if (errorData.validationErrors) {
    const validationMessages = Object.values(errorData.validationErrors).flat().join(', ');
    errorMessage += ` - Validation: ${validationMessages}`;
  }
  
  throw new Error(errorMessage);
};

// =================== API METHODS ===================
export const getData = async (endpoint) => {
  try {
    const url = buildUrl(endpoint);
    const response = await fetch(url, { headers: getHeaders() });
    
    if (!response.ok) {
      throw await handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, payload) => {
  try {
    const url = buildUrl(endpoint);
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw await handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const putData = async (endpoint, payload) => {
  try {
    const url = buildUrl(endpoint);
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw await handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const url = buildUrl(endpoint);
    const response = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw await handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default { getData, postData, putData, deleteData, getAuthToken, setAuthToken, removeAuthToken, isTokenValid, decodeToken };
