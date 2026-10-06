import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('camflow_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('camflow_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged-in demo state as Creator (Nelson Vance)
    return {
      id: "user-nelson",
      name: "Nelson Vance",
      email: "nelson@camflow.io",
      role: "creator",
      profileId: "creator-nelson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      hasCompletedOnboarding: true
    };
  });

  const [currentRole, setCurrentRole] = useState(() => user?.role || 'creator');

  useEffect(() => {
    if (user?.role) {
      setCurrentRole(user.role);
    }
  }, [user]);

  const saveAuth = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setCurrentRole(newUser.role);
    localStorage.setItem('camflow_token', newToken);
    localStorage.setItem('camflow_user', JSON.stringify(newUser));
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      saveAuth(data.token, data.user);
      return { success: true, user: data.user, creatorProfile: data.creatorProfile };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }
      saveAuth(data.token, data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('camflow_token');
    localStorage.removeItem('camflow_user');
  };

  // Instant 1-click quick login for testing/demoing
  const quickLoginAs = async (role) => {
    if (role === 'creator') {
      return login('nelson@camflow.io', 'password123');
    } else {
      return login('aura@camflow.io', 'password123');
    }
  };

  const completeCreatorOnboarding = async (creatorData) => {
    try {
      const res = await fetch('/api/auth/onboarding/creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(creatorData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Onboarding failed');
      }
      // Update local user state
      const updatedUser = { ...user, profileId: data.creator.id, hasCompletedOnboarding: true };
      setUser(updatedUser);
      localStorage.setItem('camflow_user', JSON.stringify(updatedUser));
      return { success: true, creator: data.creator };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const completeBrandOnboarding = async (brandData) => {
    try {
      const res = await fetch('/api/auth/onboarding/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(brandData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Brand onboarding failed');
      }
      const updatedUser = { ...user, hasCompletedOnboarding: true, companyName: brandData.companyName };
      setUser(updatedUser);
      localStorage.setItem('camflow_user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser, campaign: data.createdCampaign };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      currentRole,
      setCurrentRole,
      login,
      register,
      logout,
      quickLoginAs,
      completeCreatorOnboarding,
      completeBrandOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
