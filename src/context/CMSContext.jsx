import React, { createContext, useContext, useState, useEffect } from 'react';
import { packagesData } from '../data/packagesData';
import { api } from '../api/client';

const CMSContext = createContext();

const initialReviews = [
  {
    id: 'rev-1',
    name: 'Ananya Roy',
    location: 'Kolkata, WB',
    rating: 5,
    comment: 'The Sandakphu expedition was unforgettable! Kanchenjunga sunrise view was mesmerizing. Excellent guidance by Northbengal Buzz team.',
    date: '2026-07-20',
    status: 'approved',
    packageName: 'Sandakphu & Phalut Expedition'
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya Sharma',
    location: 'Delhi',
    rating: 5,
    comment: 'Booked Tinchuley & Takdah stay. Organic tea gardens, fresh pine air, and smooth jeep transport. 10/10 recommend!',
    date: '2026-08-02',
    status: 'approved',
    packageName: 'Tinchuley & Takdah Eco Retreat'
  },
  {
    id: 'rev-3',
    name: 'Priyanka Das',
    location: 'Siliguri, WB',
    rating: 4,
    comment: 'Loved the Darjeeling Toy Train & Tiger Hill experience. Very prompt WhatsApp customer support.',
    date: '2026-08-10',
    status: 'approved',
    packageName: 'Darjeeling Queen of Hills'
  }
];

const initialVisitorMedia = [
  {
    id: 'vmed-1',
    authorName: 'Suman Mukherjee',
    location: 'Durgapur',
    caption: 'Misty sunrise over Sandakphu ridge line!',
    photos: [
      '/assets/images/img-13.jpg',
      '/assets/images/img-14.jpg'
    ],
    uploadDate: '2026-08-05',
    status: 'approved'
  },
  {
    id: 'vmed-2',
    authorName: 'Sneha & Rahul',
    location: 'Bangalore',
    caption: 'Memorable tea leaf plucking at Tinchuley estate.',
    photos: [
      '/assets/images/img-15.jpg',
      '/assets/images/img-18.jpg',
      '/assets/images/img-19.jpg'
    ],
    uploadDate: '2026-08-11',
    status: 'approved'
  }
];

export const CMSProvider = ({ children }) => {
  const [backendOnline, setBackendOnline] = useState(false);
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('nbb_admin_token') || '');

  // 1. Packages State
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('nbb_cms_packages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved packages', e);
      }
    }
    return packagesData.map((pkg, idx) => {
      const orig = pkg.numericPrice || 10000;
      const discount = idx % 2 === 0 ? 15 : 0;
      const finalPrice = Math.round(orig * (1 - discount / 100));
      return {
        ...pkg,
        originalPrice: orig,
        discountPercent: discount,
        numericPrice: finalPrice,
        price: `₹${finalPrice.toLocaleString('en-IN')}`
      };
    });
  });

  // 2. Reviews State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('nbb_cms_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved reviews', e);
      }
    }
    return initialReviews;
  });

  // 3. Visitor Media State (Max 3 photos per upload)
  const [visitorMedia, setVisitorMedia] = useState(() => {
    const saved = localStorage.getItem('nbb_cms_visitor_media');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved visitor media', e);
      }
    }
    return initialVisitorMedia;
  });

  // 4. Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('nbb_admin_logged_in') === 'true';
  });

  // Fetch initial data from Express backend if server is online
  useEffect(() => {
    const syncWithBackend = async () => {
      const isHealthy = await api.checkHealth();
      setBackendOnline(isHealthy);
      if (isHealthy) {
        try {
          const remotePkgs = await api.getPackages();
          if (remotePkgs && remotePkgs.length > 0) setPackages(remotePkgs);

          const remoteRevs = isAdminLoggedIn ? await api.getAllReviews() : await api.getApprovedReviews();
          if (remoteRevs && remoteRevs.length > 0) setReviews(remoteRevs);

          const remoteMedia = isAdminLoggedIn ? await api.getAllMedia() : await api.getApprovedMedia();
          if (remoteMedia && remoteMedia.length > 0) setVisitorMedia(remoteMedia);
        } catch (err) {
          console.warn('Backend sync warning:', err.message);
        }
      }
    };
    syncWithBackend();
  }, [isAdminLoggedIn]);

  // Save to localStorage when states update
  useEffect(() => {
    localStorage.setItem('nbb_cms_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('nbb_cms_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nbb_cms_visitor_media', JSON.stringify(visitorMedia));
  }, [visitorMedia]);

  // Package Actions
  const addPackage = async (newPkg) => {
    const origPrice = Number(newPkg.originalPrice) || 0;
    const discount = Number(newPkg.discountPercent) || 0;
    const finalPrice = discount > 0 ? Math.round(origPrice * (1 - discount / 100)) : origPrice;
    
    const formattedPkg = {
      id: newPkg.id || `pkg-${Date.now()}`,
      category: newPkg.category || 'offbeat',
      title: newPkg.title,
      description: newPkg.description,
      originalPrice: origPrice,
      discountPercent: discount,
      numericPrice: finalPrice,
      price: `₹${finalPrice.toLocaleString('en-IN')}`,
      duration: newPkg.duration || '3 Days / 2 Nights',
      rating: newPkg.rating || '5.0 (1)',
      tag: newPkg.tag || 'Popular',
      tagIcon: newPkg.tagIcon || 'fas fa-star',
      image: newPkg.image || '/assets/images/img-13.jpg'
    };

    if (backendOnline) {
      try {
        const resPkg = await api.addPackage(formattedPkg, authToken);
        setPackages((prev) => [resPkg, ...prev]);
        return resPkg;
      } catch (err) {
        console.warn('Fallback to local state:', err.message);
      }
    }

    setPackages((prev) => [formattedPkg, ...prev]);
  };

  const updatePackage = async (id, updatedFields) => {
    if (backendOnline) {
      try {
        const resPkg = await api.updatePackage(id, updatedFields, authToken);
        setPackages((prev) => prev.map((p) => (p.id === id ? resPkg : p)));
        return resPkg;
      } catch (err) {
        console.warn('Fallback to local state update:', err.message);
      }
    }

    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id !== id) return pkg;
        const origPrice = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : pkg.originalPrice;
        const discount = updatedFields.discountPercent !== undefined ? Number(updatedFields.discountPercent) : pkg.discountPercent;
        const finalPrice = discount > 0 ? Math.round(origPrice * (1 - discount / 100)) : origPrice;

        return {
          ...pkg,
          ...updatedFields,
          originalPrice: origPrice,
          discountPercent: discount,
          numericPrice: finalPrice,
          price: `₹${finalPrice.toLocaleString('en-IN')}`
        };
      })
    );
  };

  const deletePackage = async (id) => {
    if (backendOnline) {
      try {
        await api.deletePackage(id, authToken);
      } catch (err) {
        console.warn('Fallback local delete:', err.message);
      }
    }
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // Review Actions
  const submitReview = async (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      name: reviewData.name,
      location: reviewData.location || 'Visitor',
      rating: Number(reviewData.rating) || 5,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      packageName: reviewData.packageName || 'General Tour'
    };

    if (backendOnline) {
      try {
        const res = await api.submitReview(reviewData);
        setReviews((prev) => [res.review || newRev, ...prev]);
        return res.review;
      } catch (err) {
        console.warn('Fallback local review submission:', err.message);
      }
    }

    setReviews((prev) => [newRev, ...prev]);
    return newRev;
  };

  const approveReview = async (id) => {
    if (backendOnline) {
      try {
        await api.updateReviewStatus(id, 'approved', authToken);
      } catch (err) {
        console.warn('Fallback local approval:', err.message);
      }
    }
    setReviews((prev) =>
      prev.map((rev) => (rev.id === id ? { ...rev, status: 'approved' } : rev))
    );
  };

  const rejectReview = async (id) => {
    if (backendOnline) {
      try {
        await api.deleteReview(id, authToken);
      } catch (err) {
        console.warn('Fallback local deletion:', err.message);
      }
    }
    setReviews((prev) => prev.filter((rev) => rev.id !== id));
  };

  // Visitor Media Upload Actions (MAX 3 PHOTOS ENFORCED)
  const submitVisitorMedia = async (mediaData) => {
    if (!mediaData.photos || mediaData.photos.length === 0) {
      throw new Error('Please select at least one photo or video.');
    }
    if (mediaData.photos.length > 3) {
      throw new Error('Upload limit exceeded! You can upload a maximum of 3 photos/videos per submission.');
    }

    const newMedia = {
      id: `vmed-${Date.now()}`,
      authorName: mediaData.authorName || 'Anonymous Traveler',
      location: mediaData.location || 'North Bengal Explorer',
      caption: mediaData.caption || '',
      photos: mediaData.photos.slice(0, 3),
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    if (backendOnline) {
      try {
        const res = await api.submitVisitorMedia(mediaData);
        setVisitorMedia((prev) => [res.media || newMedia, ...prev]);
        return res.media;
      } catch (err) {
        console.warn('Fallback local media submission:', err.message);
      }
    }

    setVisitorMedia((prev) => [newMedia, ...prev]);
    return newMedia;
  };

  const approveVisitorMedia = async (id) => {
    if (backendOnline) {
      try {
        await api.updateMediaStatus(id, 'approved', authToken);
      } catch (err) {
        console.warn('Fallback local media approval:', err.message);
      }
    }
    setVisitorMedia((prev) =>
      prev.map((med) => (med.id === id ? { ...med, status: 'approved' } : med))
    );
  };

  const rejectVisitorMedia = async (id) => {
    if (backendOnline) {
      try {
        await api.deleteMedia(id, authToken);
      } catch (err) {
        console.warn('Fallback local media deletion:', err.message);
      }
    }
    setVisitorMedia((prev) => prev.filter((med) => med.id !== id));
  };

  // Admin Auth Actions
  const loginAdmin = async (password) => {
    if (backendOnline) {
      try {
        const res = await api.loginAdmin(password);
        if (res.token) {
          setAuthToken(res.token);
          sessionStorage.setItem('nbb_admin_token', res.token);
          setIsAdminLoggedIn(true);
          sessionStorage.setItem('nbb_admin_logged_in', 'true');
          return true;
        }
      } catch (err) {
        console.warn('Express Auth failed, trying local fallback password:', err.message);
      }
    }

    if (password === 'admin123' || password === 'admin') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('nbb_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAuthToken('');
    sessionStorage.removeItem('nbb_admin_logged_in');
    sessionStorage.removeItem('nbb_admin_token');
  };

  // Compute Site Average Rating
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const totalApprovedReviewsCount = approvedReviews.length;
  const avgRating =
    totalApprovedReviewsCount > 0
      ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalApprovedReviewsCount).toFixed(1)
      : '4.9';

  return (
    <CMSContext.Provider
      value={{
        backendOnline,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        reviews,
        approvedReviews,
        submitReview,
        approveReview,
        rejectReview,
        visitorMedia,
        approvedVisitorMedia: visitorMedia.filter((m) => m.status === 'approved'),
        submitVisitorMedia,
        approveVisitorMedia,
        rejectVisitorMedia,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        avgRating,
        totalApprovedReviewsCount
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
