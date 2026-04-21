const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const parseResponse = async (res) => {
  let json;
  try {
    json = await res.json();
  } catch {
    json = { message: `Server error (${res.status})` };
  }

  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }

  return json;
};

const fetchApi = async (path, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${backendUrl}${path}`, {
    ...options,
    headers,
  });

  return parseResponse(res);
};

export const getListings = async (query = {}) => {
  const qs = new URLSearchParams(query).toString();
  return fetchApi(`/api/listings${qs ? `?${qs}` : ""}`);
};

export const getListingById = async (id) => fetchApi(`/api/listings/${id}`);

export const createListing = async (formData) =>
  fetchApi("/api/listings", {
    method: "POST",
    body: formData,
  });

export const updateListing = async (id, formData) =>
  fetchApi(`/api/listings/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteListing = async (id) =>
  fetchApi(`/api/listings/${id}`, {
    method: "DELETE",
  });

export const deleteImage = async (id, imageUrl) =>
  fetchApi(`/api/listings/${id}/image/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  });

/* ================= AUTH ================= */

export const registerUser = async (data) =>
  fetchApi("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const loginUser = async (data) =>
  fetchApi("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const getProfile = async () =>
  fetchApi("/api/auth/me");