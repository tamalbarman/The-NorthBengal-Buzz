const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // 1. Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // 2. Auth API
  loginAdmin: async (password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // 3. Packages API
  getPackages: async () => {
    const res = await fetch(`${API_BASE_URL}/packages`);
    if (!res.ok) throw new Error('Failed to fetch packages');
    return res.json();
  },

  addPackage: async (pkgData, token) => {
    const res = await fetch(`${API_BASE_URL}/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(pkgData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add package');
    return data;
  },

  updatePackage: async (id, pkgData, token) => {
    const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(pkgData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update package');
    return data;
  },

  deletePackage: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete package');
    return data;
  },

  // 4. Reviews API
  getApprovedReviews: async () => {
    const res = await fetch(`${API_BASE_URL}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch approved reviews');
    return res.json();
  },

  getAllReviews: async () => {
    const res = await fetch(`${API_BASE_URL}/reviews/all`);
    if (!res.ok) throw new Error('Failed to fetch all reviews');
    return res.json();
  },

  submitReview: async (reviewData) => {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit review');
    return data;
  },

  updateReviewStatus: async (id, status, token) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update review status');
    return data;
  },

  deleteReview: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete review');
    return data;
  },

  // 5. Visitor Media API (STRICT MAX 3 PHOTOS LIMIT ENFORCED)
  getApprovedMedia: async () => {
    const res = await fetch(`${API_BASE_URL}/media`);
    if (!res.ok) throw new Error('Failed to fetch visitor media gallery');
    return res.json();
  },

  getAllMedia: async () => {
    const res = await fetch(`${API_BASE_URL}/media/all`);
    if (!res.ok) throw new Error('Failed to fetch all visitor media');
    return res.json();
  },

  submitVisitorMedia: async (mediaData) => {
    if (!mediaData.photos || mediaData.photos.length > 3) {
      throw new Error('Upload storage limit exceeded! Maximum 3 photos allowed.');
    }
    const res = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to upload visitor photos');
    return data;
  },

  updateMediaStatus: async (id, status, token) => {
    const res = await fetch(`${API_BASE_URL}/media/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update media status');
    return data;
  },

  deleteMedia: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete media');
    return data;
  }
};
