"use client";
import React, { useState } from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [subscriptionTier, setSubscriptionTier] = useState("free");
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState(null);
  const [scannedItemsCount, setScannedItemsCount] = useState(0);
  const categories = ["All", "Dairy", "Fruits", "Vegetables", "Meat", "Pantry"];
  const [newProduct, setNewProduct] = useState({
    name: "",
    expiry: "",
    quantity: 1,
    location: "pantry",
    category: "Pantry",
    temperature: "",
    humidity: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Milk",
      expiry: "2025-05-8",
      quantity: 1,
      category: "Dairy",
      status: "near",
      temperature: "4",
      humidity: "40",
    },
    {
      id: 2,
      name: "Bread",
      expiry: "2025-05-10",
      quantity: 2,
      category: "Pantry",
      status: "near",
      temperature: "20",
      humidity: "45",
    },
    {
      id: 3,
      name: "Apples",
      expiry: "2025-05-12",
      quantity: 6,
      category: "Fruits",
      status: "near",
      temperature: "8",
      humidity: "60",
    },
  ]);
  const [error, setError] = useState(null);
  const [upload, { loading }] = useUpload();
  const [barcodeScannerActive, setBarcodeScannerActive] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("view");
  const [isPrimaryUser, setIsPrimaryUser] = useState(true);
  const [sharedMembers, setSharedMembers] = useState([
    { id: 1, email: "owner@example.com", role: "primary" },
    { id: 2, email: "editor@example.com", role: "edit" },
    { id: 3, email: "viewer@example.com", role: "view" },
  ]);
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      user: "owner@example.com",
      action: "added Milk",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      user: "editor@example.com",
      action: "updated Bread quantity",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [recipes] = useState([
    {
      id: 1,
      name: "Butter Chicken",
      time: "45 min",
      ingredients: [
        "Chicken",
        "Yogurt",
        "Tomatoes",
        "Butter",
        "Cream",
        "Garam Masala",
      ],
      image: "/images/butter-chicken.jpg",
    },
    {
      id: 2,
      name: "Vegetable Biryani",
      time: "60 min",
      ingredients: [
        "Basmati Rice",
        "Mixed Vegetables",
        "Biryani Masala",
        "Saffron",
        "Ghee",
        "Onions",
      ],
      image: "biryani.jpg",
    },
    {
      id: 3,
      name: "Palak Paneer",
      time: "30 min",
      ingredients: [
        "Spinach",
        "Paneer",
        "Onions",
        "Tomatoes",
        "Ginger",
        "Garlic",
      ],
      image: "palak-paneer.jpg",
    },
    {
      id: 4,
      name: "Dal Makhani",
      time: "45 min",
      ingredients: [
        "Black Lentils",
        "Kidney Beans",
        "Cream",
        "Butter",
        "Tomatoes",
        "Spices",
      ],
      image: "dal-makhani.jpg",
    },
    {
      id: 5,
      name: "Chicken Tikka Masala",
      time: "50 min",
      ingredients: [
        "Chicken",
        "Yogurt",
        "Tikka Masala",
        "Cream",
        "Onions",
        "Tomatoes",
      ],
      image: "tikka-masala.jpg",
    },
    {
      id: 6,
      name: "Aloo Gobi",
      time: "35 min",
      ingredients: [
        "Potatoes",
        "Cauliflower",
        "Onions",
        "Tomatoes",
        "Turmeric",
        "Cumin",
      ],
      image: "aloo-gobi.jpg",
    },
  ]);
  const [settings, setSettings] = useState({
    notifications: true,
    smartHome: false,
    darkMode: false,
  });
  const getStorageRecommendation = (category, temperature, humidity) => {
    const recommendations = {
      Dairy: {
        ideal: { temp: "4", humidity: "40" },
        message:
          temperature > 4
            ? "Move to a cooler place"
            : "Storage conditions are optimal",
      },
      Fruits: {
        ideal: { temp: "8", humidity: "60" },
        message:
          temperature > 8
            ? "Consider refrigeration"
            : "Storage conditions are optimal",
      },
      Vegetables: {
        ideal: { temp: "10", humidity: "65" },
        message:
          temperature > 10
            ? "Store in crisper drawer"
            : "Storage conditions are optimal",
      },
      Meat: {
        ideal: { temp: "2", humidity: "35" },
        message:
          temperature > 2
            ? "Move to freezer immediately"
            : "Storage conditions are optimal",
      },
      Pantry: {
        ideal: { temp: "20", humidity: "45" },
        message:
          humidity > 45
            ? "Move to a drier location"
            : "Storage conditions are optimal",
      },
    };

    const categoryRec = recommendations[category];
    if (!categoryRec) return "Check storage guidelines";

    const tempDiff = Math.abs(temperature - categoryRec.ideal.temp);
    const humidityDiff = Math.abs(humidity - categoryRec.ideal.humidity);

    if (tempDiff > 5 || humidityDiff > 15) {
      return categoryRec.message;
    }
    return "Storage conditions are optimal";
  };
  const calculateDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: "logged in",
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const handleLogout = () => {
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: "logged out",
        timestamp: new Date().toISOString(),
      },
    ]);
    setIsLoggedIn(false);
    setSubscriptionTier("free");
    setActiveTab("home");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setShowRegisterModal(false);
    setShowPlansModal(true);
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 30);
    setTrialEndDate(trialEnd);
    setIsTrialActive(true);
    setSubscriptionTier("premium");
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: registerForm.email,
        action: "registered and started 30-day premium trial",
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "fresh":
        return "bg-green-500";
      case "near":
        return "bg-yellow-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.expiry) return;

    if (products.length >= 30 && subscriptionTier === "free") {
      setError("Upgrade to premium to add more than 30 products");
      return;
    }

    const today = new Date();
    const expiryDate = new Date(newProduct.expiry);
    let status = "fresh";

    if (expiryDate < today) {
      status = "expired";
    } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) < 7) {
      status = "near";
    }

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...newProduct, status } : p
        )
      );
      setEditingProduct(null);
      setActivityLog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: loginForm.email,
          action: `updated ${newProduct.name}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      setProducts((prevProducts) => {
        const newProducts = [
          ...prevProducts,
          {
            id: prevProducts.length + 1,
            ...newProduct,
            status,
          },
        ];
        return newProducts.sort(
          (a, b) => new Date(a.expiry) - new Date(b.expiry)
        );
      });
      setActivityLog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: loginForm.email,
          action: `added ${newProduct.name}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    setNewProduct({
      name: "",
      expiry: "",
      quantity: 1,
      location: "pantry",
      category: "Pantry",
      temperature: "",
      humidity: "",
    });
    setShowAddModal(false);
  };
  const toggleSetting = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `toggled ${setting}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const handleBarcodeDetected = async (barcode) => {
    if (subscriptionTier === "free" && !isTrialActive && scannedItemsCount >= 30) {
      setShowPlansModal(true);
      return;
    }

    const mockProductData = {
      name: "Scanned Item",
      expiry: "2024-03-01",
      quantity: 1,
      location: "pantry",
      category: "Pantry",
      temperature: "20",
      humidity: "45",
    };
    setNewProduct(mockProductData);
    setShowAddModal(true);
    setBarcodeScannerActive(false);
    
    if (subscriptionTier === "free" && !isTrialActive) {
      setScannedItemsCount(prev => prev + 1);
    }

    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: "scanned a barcode",
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );
  const productStats = categories.reduce((acc, category) => {
    if (category !== "All") {
      acc[category] = products.filter((p) => p.category === category).length;
    }
    return acc;
  }, {});
  const handleSelectPlan = (plan) => {
    if (plan === "free") {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 30);
      setTrialEndDate(trialEnd);
      setIsTrialActive(true);
      setSubscriptionTier("premium");
      setActivityLog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: loginForm.email,
          action: "started 30-day premium trial with free plan",
          timestamp: new Date().toISOString(),
        },
      ]);
    } else if (plan === "premium") {
      setSubscriptionTier("premium");
      setIsTrialActive(false);
    }
    
    setIsLoggedIn(true);
    setShowPlansModal(false);
    
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `selected ${plan} plan${plan === "free" ? " with premium trial" : ""}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const handleRemoveProduct = (id) => {
    const product = products.find((p) => p.id === id);
    setProducts(products.filter((product) => product.id !== id));
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `removed ${product.name}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      expiry: product.expiry,
      quantity: product.quantity,
      category: product.category,
      location: product.location || "pantry",
      temperature: product.temperature || "",
      humidity: product.humidity || "",
    });
    setShowAddModal(true);
  };
  const handleInviteMember = () => {
    if (!inviteEmail) return;
    const newMember = {
      id: sharedMembers.length + 1,
      email: inviteEmail,
      role: inviteRole,
    };
    setSharedMembers([...sharedMembers, newMember]);
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `invited ${inviteEmail} as ${inviteRole}`,
        timestamp: new Date().toISOString(),
      },
    ]);
    setShowInviteModal(false);
    setInviteEmail("");
    setInviteRole("view");
  };
  const handleUpdateMemberRole = (memberId, newRole) => {
    const member = sharedMembers.find((m) => m.id === memberId);
    setSharedMembers(
      sharedMembers.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `updated ${member.email}'s role to ${newRole}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  const handleRemoveMember = (memberId) => {
    const member = sharedMembers.find((m) => m.id === memberId);
    setSharedMembers(sharedMembers.filter((member) => member.id !== memberId));
    setActivityLog((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: loginForm.email,
        action: `removed ${member.email}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        .pulsing {
          animation: pulse 2s ease-in-out infinite;
        }
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .gradient-bg {
          background: linear-gradient(135deg, #6BBF59 0%, #4A90E2 100%);
        }
        .neon-glow {
          box-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div
        className={`min-h-screen ${
          settings.darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-green-50"
        } transition-colors duration-300`}
      >
        <div
          className={`max-w-md mx-auto ${
            settings.darkMode ? "bg-gray-800" : "bg-white"
          } min-h-screen flex flex-col shadow-2xl transition-colors duration-300`}
        >
          <header
            className={`${
              settings.darkMode ? "bg-gray-800" : "gradient-bg"
            } text-white p-4 flex items-center justify-between sticky top-0 z-50`}
          >
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <i className="fas fa-box-open text-3xl floating"></i>
              <span>Storify</span>
            </h1>
            {!isLoggedIn ? (
              <div className="space-x-2">
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Register
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 bg-white text-[#6BBF59] rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <i className="fas fa-bell"></i>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          <div className="flex-1 overflow-y-auto">
            {activeTab === "settings" && (
              <div className="p-4 space-y-6">
                <div
                  className={`${
                    settings.darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-lg p-6`}
                >
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      settings.darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Preferences
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-medium ${
                            settings.darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Dark Mode
                        </h3>
                        <p
                          className={`text-sm ${
                            settings.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Enable dark theme
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSetting("darkMode")}
                        className={`w-14 h-8 flex items-center rounded-full p-1 ${
                          settings.darkMode ? "bg-[#4A90E2]" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                            settings.darkMode ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-medium ${
                            settings.darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Notifications
                        </h3>
                        <p
                          className={`text-sm ${
                            settings.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Expiry alerts and updates
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSetting("notifications")}
                        className={`w-14 h-8 flex items-center rounded-full p-1 ${
                          settings.notifications
                            ? "bg-[#4A90E2]"
                            : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                            settings.notifications ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-medium ${
                            settings.darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          Smart Home Integration
                        </h3>
                        <p
                          className={`text-sm ${
                            settings.darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Connect with smart devices
                        </p>
                      </div>
                      {subscriptionTier === "premium" || isTrialActive ? (
                        <button
                          onClick={() => toggleSetting("smartHome")}
                          className={`w-14 h-8 flex items-center rounded-full p-1 ${
                            settings.smartHome ? "bg-[#4A90E2]" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                              settings.smartHome ? "translate-x-6" : ""
                            }`}
                          ></div>
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowPlansModal(true)}
                          className="text-sm text-purple-600 hover:text-purple-800"
                        >
                          <i className="fas fa-lock mr-1"></i>
                          Premium Only
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    settings.darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-lg p-6`}
                >
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      settings.darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Account
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3
                        className={`font-medium ${
                          settings.darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Current Plan
                      </h3>
                      <p
                        className={`text-sm ${
                          settings.darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {isTrialActive 
                          ? "Premium Trial (30 days)"
                          : subscriptionTier === "premium"
                          ? "Premium Plan"
                          : "Free Plan"}
                      </p>
                      {isTrialActive && (
                        <p className="text-sm text-green-600 mt-1">
                          {Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                        </p>
                      )}
                    </div>

                    {subscriptionTier === "free" && !isTrialActive && (
                      <button
                        onClick={() => setShowPlansModal(true)}
                        className="w-full py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
                      >
                        Upgrade to Premium
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`${
                    settings.darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-lg p-6`}
                >
                  <h2
                    className={`text-xl font-bold mb-4 ${
                      settings.darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Help & Support
                  </h2>

                  <div className="space-y-4">
                    <button
                      className={`flex items-center space-x-2 ${
                        settings.darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <i className="fas fa-book"></i>
                      <span>Documentation</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 ${
                        settings.darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <i className="fas fa-question-circle"></i>
                      <span>FAQ</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 ${
                        settings.darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <i className="fas fa-envelope"></i>
                      <span>Contact Support</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "home" && (
              <div className="p-4 space-y-4">
                {!isLoggedIn && (
                  <div className={`${
                    settings.darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <i className="fas fa-box-open text-4xl text-[#6BBF59] floating"></i>
                      <div>
                        <h2 className={`text-2xl font-bold ${settings.darkMode ? "text-white" : "text-gray-800"}`}>Welcome To Storify!</h2>
                        <p className={`${settings.darkMode ? "text-gray-300" : "text-gray-600"}`}>Track, Manage, Save!</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setShowRegisterModal(true)}
                        className="gradient-bg text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        Register
                      </button>
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-white text-[#6BBF59] border-2 border-[#6BBF59] px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                )}

                <div className={`${
                  settings.darkMode ? "bg-gray-700" : "bg-white"
                } rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover`}>
                  <h2 className={`text-xl font-bold mb-4 flex items-center ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    <i className="fas fa-clock text-yellow-500 mr-2"></i>
                    Expiring Soon
                  </h2>
                  <div className="space-y-3">
                    {products
                      .filter((p) => p.status === "near")
                      .map((product, index) => (
                        <div
                          key={product.id}
                          className={`${
                            settings.darkMode ? "bg-gray-800" : "bg-gray-50"
                          } p-4 rounded-lg hover:shadow-md transition-all duration-300 card-hover`}
                          style={{
                            animation: `slideIn ${0.2 + index * 0.1}s ease-out`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full ${
                                product.category === "Dairy" ? "bg-yellow-100" :
                                product.category === "Fruits" ? "bg-red-100" :
                                product.category === "Vegetables" ? "bg-green-100" :
                                product.category === "Meat" ? "bg-pink-100" :
                                "bg-gray-100"
                              } flex items-center justify-center`}>
                                <i className={`fas ${
                                  product.category === "Dairy" ? "fa-cheese" :
                                  product.category === "Fruits" ? "fa-apple-alt" :
                                  product.category === "Vegetables" ? "fa-carrot" :
                                  product.category === "Meat" ? "fa-drumstick-bite" :
                                  "fa-box"
                                } text-2xl`}></i>
                              </div>
                              <div>
                                <h3 className={`font-semibold ${settings.darkMode ? "text-white" : "text-gray-800"}`}>{product.name}</h3>
                                <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>
                                  {calculateDaysUntilExpiry(product.expiry)} days left
                                </p>
                              </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(product.status)}`}></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {isLoggedIn && (
                  <div className={`${
                    settings.darkMode ? "bg-gray-700" : "bg-white"
                  } rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover`}>
                    <h2 className="text-xl font-bold mb-4">Product Categories</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.slice(1).map((category, index) => (
                        <div
                          key={category}
                          className={`${
                            settings.darkMode ? "bg-gray-800" : "bg-gray-50"
                          } p-4 rounded-lg hover:shadow-lg transition-all duration-300 card-hover`}
                          style={{
                            animation: `slideIn ${0.3 + index * 0.1}s ease-out`,
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{category}</span>
                            <span className="text-sm text-gray-500">
                              {productStats[category]} items
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded overflow-hidden">
                            <div
                              className="h-full gradient-bg rounded transition-all duration-500 ease-out"
                              style={{
                                width: `${(productStats[category] / products.length) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab("scan")}
                    className={`${
                      settings.darkMode ? "bg-gray-700" : "gradient-bg"
                    } text-white p-6 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 card-hover`}
                  >
                    <i className="fas fa-barcode text-3xl mb-2 floating"></i>
                    <span>Scan Product</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className={`${
                      settings.darkMode ? "bg-gray-700" : "gradient-bg"
                    } text-white p-6 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 card-hover`}
                  >
                    <i className="fas fa-box-open text-3xl mb-2 floating"></i>
                    <span>Inventory</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("recipes")}
                    className={`${
                      settings.darkMode ? "bg-gray-700" : "gradient-bg"
                    } text-white p-6 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 card-hover`}
                  >
                    <i className="fas fa-utensils text-3xl mb-2 floating"></i>
                    <span>Recipes</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`${
                      settings.darkMode ? "bg-gray-700" : "gradient-bg"
                    } text-white p-6 rounded-xl flex flex-col items-center hover:scale-105 transition-all duration-300 card-hover`}
                  >
                    <i className="fas fa-cog text-3xl mb-2 floating"></i>
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "scan" && (
              <div className="p-4 text-center">
                {!isLoggedIn ? (
                  <div className="bg-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                    <i className="fas fa-lock text-4xl text-purple-600 mb-4 floating"></i>
                    <h3 className="font-bold mb-2">Login Required</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please login to use the barcode scanner
                    </p>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      Login
                    </button>
                  </div>
                ) : subscriptionTier === "free" && !isTrialActive && scannedItemsCount >= 30 ? (
                  <div className="bg-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                    <i className="fas fa-lock text-4xl text-purple-600 mb-4 floating"></i>
                    <h3 className="font-bold mb-2">Premium Feature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      You've reached the limit of 30 free scans. Upgrade to Premium for unlimited scanning.
                    </p>
                    <button
                      onClick={() => setShowPlansModal(true)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      Upgrade Now
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                      {barcodeScannerActive ? (
                        <div className="relative">
                          <video
                            id="scanner"
                            className="w-full h-64 object-cover rounded-lg"
                          ></video>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-1 bg-red-500 animate-pulse"></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <i className="fas fa-camera text-4xl text-gray-400 mb-2 floating"></i>
                          <p>Point camera at barcode</p>
                        </>
                      )}
                    </div>
                    {subscriptionTier === "free" && (
                      <div className="mb-4 text-sm text-gray-600">
                        {isTrialActive ? (
                          <p className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                            Premium Trial Active - {Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                          </p>
                        ) : (
                          <p className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                            Free scans remaining: {30 - scannedItemsCount}
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => setBarcodeScannerActive(!barcodeScannerActive)}
                      className="gradient-bg text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      {barcodeScannerActive ? "Stop Scanning" : "Start Scanning"}
                    </button>
                  </>
                )}
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="p-4">
                <div className="mb-4 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {product.category === "Dairy" && (
                            <i className="fas fa-cheese text-yellow-500 mr-2"></i>
                          )}
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">
                              {calculateDaysUntilExpiry(product.expiry)} days
                              until expiry
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(
                              product.status
                            )}`}
                          ></div>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <p className="text-gray-600">
                          Current Storage: {product.temperature}°C,{" "}
                          {product.humidity}% humidity
                        </p>
                        <p
                          className={`mt-1 ${
                            getStorageRecommendation(
                              product.category,
                              parseFloat(product.temperature),
                              parseFloat(product.humidity)
                            ).includes("optimal")
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          <i className="fas fa-info-circle mr-1"></i>
                          {getStorageRecommendation(
                            product.category,
                            parseFloat(product.temperature),
                            parseFloat(product.humidity)
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="fixed bottom-20 right-4 w-14 h-14 bg-[#4A90E2] text-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <i className="fas fa-plus text-xl"></i>
                </button>
              </div>
            )}

            {activeTab === "recipes" && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className={`${
                        settings.darkMode ? "bg-gray-700" : "bg-white"
                      } rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-200`}
                    >
                      <img
                        src={recipe.image}
                        alt={`${recipe.name} presentation`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3
                          className={`font-semibold text-lg ${
                            settings.darkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {recipe.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            settings.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          } mb-2`}
                        >
                          <i className="fas fa-clock mr-1"></i>
                          {recipe.time}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, i) => (
                            <span
                              key={i}
                              className={`text-xs px-2 py-1 rounded ${
                                settings.darkMode
                                  ? "bg-gray-600 text-gray-300"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shared" && (
              <div className="p-4 space-y-4">
                {!isLoggedIn || (subscriptionTier === "free" && !isTrialActive) ? (
                  <div className="bg-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                    <i className="fas fa-lock text-4xl text-purple-600 mb-4 floating"></i>
                    <h3 className="font-bold mb-2">Premium Feature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {isTrialActive 
                        ? "Enjoy family sharing during your 30-day premium trial!"
                        : "Upgrade to Premium to share access with family and friends"}
                    </p>
                    {!isTrialActive && (
                      <button
                        onClick={() => setShowPlansModal(true)}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        Upgrade Now
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2
                        className={`text-xl font-bold ${
                          settings.darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Shared Access
                      </h2>
                      {isPrimaryUser && (
                        <button
                          onClick={() => setShowInviteModal(true)}
                          className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg"
                        >
                          <i className="fas fa-user-plus mr-2"></i>
                          Invite Member
                        </button>
                      )}
                    </div>

                    <div
                      className={`${
                        settings.darkMode ? "bg-gray-700" : "bg-white"
                      } rounded-lg p-4`}
                    >
                      <h3
                        className={`font-semibold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Members
                      </h3>
                      <div className="space-y-3">
                        {sharedMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-[#4A90E2] flex items-center justify-center text-white">
                                {member.email[0].toUpperCase()}
                              </div>
                              <div>
                                <p
                                  className={`font-medium ${
                                    settings.darkMode
                                      ? "text-white"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {member.email}
                                </p>
                                <p
                                  className={`text-sm ${
                                    settings.darkMode
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {member.role === "primary"
                                    ? "Owner"
                                    : member.role === "edit"
                                    ? "Full Access"
                                    : "View Only"}
                                </p>
                              </div>
                            </div>
                            {isPrimaryUser && member.role !== "primary" && (
                              <div className="flex items-center space-x-2">
                                <select
                                  value={member.role}
                                  onChange={(e) =>
                                    handleUpdateMemberRole(
                                      member.id,
                                      e.target.value
                                    )
                                  }
                                  className="p-1 text-sm border rounded"
                                >
                                  <option value="view">View Only</option>
                                  <option value="edit">Full Access</option>
                                </select>
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`${
                        settings.darkMode ? "bg-gray-700" : "bg-white"
                      } rounded-lg p-4`}
                    >
                      <h3
                        className={`font-semibold mb-3 ${
                          settings.darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Activity Log
                      </h3>
                      <div className="space-y-3">
                        {activityLog.map((activity) => (
                          <div
                            key={activity.id}
                            className={`p-3 rounded-lg ${
                              settings.darkMode ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-medium ${
                                  settings.darkMode
                                    ? "text-white"
                                    : "text-gray-800"
                                }`}
                              >
                                {activity.user}
                              </span>
                              <span
                                className={`text-sm ${
                                  settings.darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                {activity.action}
                              </span>
                            </div>
                            <p
                              className={`text-sm ${
                                settings.darkMode
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <nav
            className={`flex border-t ${
              settings.darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            }`}
          >
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "home"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-home text-xl mb-1"></i>
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab("scan")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "scan"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-barcode text-xl mb-1"></i>
              <span className="text-xs">Scan</span>
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "inventory"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-box-open text-xl mb-1"></i>
              <span className="text-xs">Items</span>
            </button>
            <button
              onClick={() => setActiveTab("shared")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "shared"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-users text-xl mb-1"></i>
              <span className="text-xs">Shared</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "settings"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-cog text-xl mb-1"></i>
              <span className="text-xs">Settings</span>
            </button>
          </nav>

          {showLoginModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className={`${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 w-full max-w-md`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    settings.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-2 rounded"
                  >
                    Login
                  </button>
                </form>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {showRegisterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className={`${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 w-full max-w-md`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    settings.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Register
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-2 rounded"
                  >
                    Register
                  </button>
                </form>
                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    setError(null);
                  }}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {showPlansModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className={`${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 w-full max-w-md`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    settings.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Choose Your Plan
                </h2>
                <div className="space-y-4">
                  <div className="w-full p-4 border rounded-lg">
                    <h3 className="font-bold">Free Plan</h3>
                    <p className="text-sm text-gray-500">Basic features with 30-day premium trial</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>• Up to 30 items</li>
                      <li>• Basic inventory management</li>
                      <li>• Manual item entry</li>
                      <li>• 30 free barcode scans</li>
                      <li className="text-green-600 font-medium">• 30-day premium trial included!</li>
                    </ul>
                    <button
                      onClick={() => handleSelectPlan("free")}
                      className="mt-4 w-full py-2 border rounded hover:bg-gray-50"
                    >
                      Start Free Plan with Trial
                    </button>
                  </div>
                  <div className="w-full p-4 bg-[#4A90E2] text-white rounded-lg">
                    <h3 className="font-bold">Premium Plan</h3>
                    <p className="text-sm">AED 4.99/month</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Unlimited items</li>
                      <li>• Smart home integration</li>
                      <li>• Unlimited barcode scanning</li>
                      <li>• Family sharing</li>
                      <li>• Premium support</li>
                    </ul>
                    <button
                      onClick={() => handleSelectPlan("premium")}
                      className="mt-4 w-full py-2 bg-white text-[#4A90E2] rounded hover:bg-gray-50"
                    >
                      Get Premium
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowPlansModal(false)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className={`${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 w-full max-w-md`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    settings.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {editingProduct ? "Edit Item" : "Add New Item"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Item name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="date"
                    name="expiry"
                    value={newProduct.expiry}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, expiry: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="quantity"
                      value={newProduct.quantity}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      min="1"
                      className="w-24 p-2 border rounded"
                    />
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      className="flex-1 p-2 border rounded"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="temperature"
                      placeholder="Temperature (°C)"
                      value={newProduct.temperature}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          temperature: e.target.value,
                        })
                      }
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      type="number"
                      name="humidity"
                      placeholder="Humidity (%)"
                      value={newProduct.humidity}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          humidity: e.target.value,
                        })
                      }
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                  <button
                    onClick={handleAddProduct}
                    className="w-full bg-[#4A90E2] text-white py-2 rounded"
                  >
                    {editingProduct ? "Save Changes" : "Add Item"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: "",
                      expiry: "",
                      quantity: 1,
                      location: "pantry",
                      category: "Pantry",
                      temperature: "",
                      humidity: "",
                    });
                  }}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {showInviteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div
                className={`${
                  settings.darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg p-6 w-full max-w-md`}
              >
                <h2
                  className={`text-xl font-bold mb-4 ${
                    settings.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Invite Member
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="inviteEmail"
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="view">View Only</option>
                    <option value="edit">Full Access</option>
                  </select>
                  <button
                    onClick={handleInviteMember}
                    className="w-full bg-[#4A90E2] text-white py-2 rounded"
                  >
                    Send Invite
                  </button>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainComponent;