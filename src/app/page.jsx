"use client";
import React, { useState, useRef, useEffect } from "react";

import { useUpload } from "../utilities/runtime-helpers";

// Confetti logic
function ConfettiBurst({ trigger }) {
  const ref = useRef();
  React.useEffect(() => {
    if (trigger) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
        });
      });
    }
  }, [trigger]);
  return null;
}

// Notification component
function Notification({ message, type, onClose }) {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center space-x-3 ${
      type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
    }`}>
      <i className={`fas ${type === 'warning' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle'}`}></i>
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

function MainComponent() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
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
      expiry: "2025-05-10",
      quantity: 1,
      category: "Dairy",
      status: "near",
      temperature: "4",
      humidity: "40",
    },
    {
      id: 2,
      name: "Bread",
      expiry: "2025-05-12",
      quantity: 2,
      category: "Pantry",
      status: "near",
      temperature: "20",
      humidity: "45",
    },
    {
      id: 3,
      name: "Apples",
      expiry: "2025-05-15",
      quantity: 6,
      category: "Fruits",
      status: "near",
      temperature: "8",
      humidity: "60",
    },
    {
      id: 4,
      name: "Chicken Breast",
      expiry: "2025-05-8",
      quantity: 2,
      category: "Meat",
      status: "near",
      temperature: "2",
      humidity: "35",
    },
    {
      id: 5,
      name: "Yogurt",
      expiry: "2025-05-9",
      quantity: 4,
      category: "Dairy",
      status: "near",
      temperature: "4",
      humidity: "40",
    },
    {
      id: 6,
      name: "Spinach",
      expiry: "2025-05-8",
      quantity: 1,
      category: "Vegetables",
      status: "near",
      temperature: "10",
      humidity: "65",
    },
    {
      id: 7,
      name: "Strawberries",
      expiry: "2025-05-7",
      quantity: 1,
      category: "Fruits",
      status: "near",
      temperature: "8",
      humidity: "60",
    },
    {
      id: 8,
      name: "Ground Beef",
      expiry: "2025-05-8",
      quantity: 1,
      category: "Meat",
      status: "near",
      temperature: "2",
      humidity: "35",
    },
    {
      id: 9,
      name: "Cheese",
      expiry: "2025-05-20",
      quantity: 2,
      category: "Dairy",
      status: "near",
      temperature: "4",
      humidity: "40",
    },
    {
      id: 10,
      name: "Tomatoes",
      expiry: "2025-05-9",
      quantity: 4,
      category: "Vegetables",
      status: "near",
      temperature: "10",
      humidity: "65",
    },
    {
      id: 11,
      name: "Bananas",
      expiry: "2025-05-7",
      quantity: 6,
      category: "Fruits",
      status: "near",
      temperature: "8",
      humidity: "60",
    },
    {
      id: 12,
      name: "Salmon Fillet",
      expiry: "2025-05-8",
      quantity: 2,
      category: "Meat",
      status: "near",
      temperature: "2",
      humidity: "35",
    },
    {
      id: 13,
      name: "Butter",
      expiry: "2025-05-25",
      quantity: 1,
      category: "Dairy",
      status: "near",
      temperature: "4",
      humidity: "40",
    },
    {
      id: 14,
      name: "Bell Peppers",
      expiry: "2025-05-9",
      quantity: 3,
      category: "Vegetables",
      status: "near",
      temperature: "10",
      humidity: "65",
    },
    {
      id: 15,
      name: "Oranges",
      expiry: "2025-05-10",
      quantity: 4,
      category: "Fruits",
      status: "near",
      temperature: "8",
      humidity: "60",
    }
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
  const [recipes, setRecipes] = useState([
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
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60",
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
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    }
  ]);
  const [settings, setSettings] = useState({
    notifications: true,
    smartHome: false,
    darkMode: false,
  });
  const [selectedDonationItem, setSelectedDonationItem] = useState(null);
  const [foodBanks] = useState([
    {
      id: 1,
      name: "Emirates Red Crescent",
      address: "Al Bateen, Abu Dhabi",
      phone: "02-621-9999",
      hours: "Sun-Thu 8AM-4PM",
      acceptedItems: ["Non-perishables", "Canned goods", "Rice", "Flour", "Oil", "Dates"],
      distance: "3.2 km",
      website: "https://www.rcuae.ae/en"
    },
    {
      id: 2,
      name: "Dar Zayed for Family Care",
      address: "Al Nahyan, Abu Dhabi",
      phone: "02-666-6666",
      hours: "Sun-Thu 9AM-5PM",
      acceptedItems: ["All food items", "Personal care items", "Clothing"],
      distance: "4.5 km",
      website: "https://www.zayed.org.ae"
    },
    {
      id: 3,
      name: "Abu Dhabi Food Bank",
      address: "Al Ain, Abu Dhabi",
      phone: "02-666-7777",
      hours: "24/7",
      acceptedItems: ["Fresh food", "Packaged food", "Beverages"],
      distance: "7.8 km",
      website: "https://www.ead.gov.ae/en/join-us/food-bank"
    },
    {
      id: 4,
      name: "Khalifa Bin Zayed Al Nahyan Foundation",
      address: "Al Bateen, Abu Dhabi",
      phone: "02-666-8888",
      hours: "Sun-Thu 8AM-4PM",
      acceptedItems: ["All food items", "Educational materials", "Medical supplies"],
      distance: "5.1 km",
      website: "https://www.kbzf.org"
    }
  ]);
  const [communityEvents] = useState([
    {
      id: 1,
      title: "Ramadan Food Drive 2025",
      date: "2025-03-10",
      location: "Abu Dhabi National Exhibition Centre",
      organizer: "Emirates Red Crescent",
      description: "Annual Ramadan food drive to support families in need across the UAE",
      type: "Food Drive"
    },
    {
      id: 2,
      title: "Community Iftar Sharing",
      date: "2025-03-15",
      location: "Sheikh Zayed Grand Mosque",
      organizer: "Abu Dhabi Food Bank",
      description: "Community iftar sharing program during Ramadan",
      type: "Community Event"
    },
    {
      id: 3,
      title: "Neighborhood Food Sharing Day",
      date: "2024-12-20",
      location: "Khalifa City",
      organizer: "Abu Dhabi Municipality",
      description: "Share excess food with neighbors and reduce food waste",
      type: "Community Event"
    },
    {
      id: 4,
      title: "Eid Al Fitr Food Distribution",
      date: "2025-04-10",
      location: "Multiple locations across Abu Dhabi",
      organizer: "Dar Zayed for Family Care",
      description: "Eid food distribution program for families in need",
      type: "Food Drive"
    }
  ]);
  const [donationHistory, setDonationHistory] = useState([
    {
      id: 1,
      item: "Canned Beans",
      quantity: 5,
      recipient: "Community Food Bank",
      date: "2024-03-01"
    }
  ]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeError, setRecipeError] = useState(null);
  // 1. Add profile and achievements state
  const [profile, setProfile] = useState({
    name: "Alex",
    email: "alex@example.com",
    avatar: "A",
    achievements: {
      firstDonation: true,
      wasteWarrior: true,
      inventoryMaster: true,
      zeroWasteWeek: false,
      pantryPro: false,
      recipeExplorer: true,
      communityHelper: false,
    },
    stats: {
      donations: 3,
      expiredRemoved: 12,
      itemsAdded: 25,
      zeroWasteStreak: 4,
      aiRecipes: 6,
    }
  });

  // 2. Update achievements on actions
  const updateAchievements = (updates = {}) => {
    setProfile(prev => {
      const stats = { ...prev.stats, ...updates };
      const newAchievements = {
        ...prev.achievements,
        firstDonation: stats.donations >= 1 || prev.achievements.firstDonation,
        wasteWarrior: stats.expiredRemoved >= 10 || prev.achievements.wasteWarrior,
        inventoryMaster: stats.itemsAdded >= 20 || prev.achievements.inventoryMaster,
        zeroWasteWeek: stats.zeroWasteStreak >= 7 || prev.achievements.zeroWasteWeek,
        pantryPro: stats.itemsAdded >= 50 || prev.achievements.pantryPro,
        recipeExplorer: stats.aiRecipes >= 5 || prev.achievements.recipeExplorer,
        communityHelper: stats.donations >= 5 || prev.achievements.communityHelper,
      };
      // Check if any new badge is unlocked
      const unlocked = Object.keys(newAchievements).some(
        key => newAchievements[key] && !prev.achievements[key]
      );
      if (unlocked) triggerConfetti();
      return {
        ...prev,
        stats,
        achievements: newAchievements,
      };
    });
  };

  // Helper to trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 100); // retrigger
  };

  // When saving profile changes, also trigger confetti
  const handleProfileSave = (newName, newAvatar) => {
    setProfile(prev => ({ ...prev, name: newName, avatar: newAvatar }));
    triggerConfetti();
  };

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
    // 2. Update achievements on actions
    updateAchievements({ itemsAdded: profile.stats.itemsAdded + 1 });
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
      setActivityLog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: loginForm.email,
          action: "selected premium monthly plan",
          timestamp: new Date().toISOString(),
        },
      ]);
    } else if (plan === "premium-yearly") {
      setSubscriptionTier("premium");
      setIsTrialActive(false);
      const yearlyEnd = new Date();
      yearlyEnd.setFullYear(yearlyEnd.getFullYear() + 1);
      setTrialEndDate(yearlyEnd);
      setActivityLog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          user: loginForm.email,
          action: "selected premium yearly plan",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    
    setIsLoggedIn(true);
    setShowPlansModal(false);
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
    // 2. Update achievements on actions
    updateAchievements({ expiredRemoved: profile.stats.expiredRemoved + 1 });
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
  const handleDonateItem = (item) => {
    setSelectedDonationItem(item);
    setShowDonateModal(true);
  };
  const handleConfirmDonation = (recipient) => {
    if (selectedDonationItem) {
      setDonationHistory(prev => [...prev, {
        id: prev.length + 1,
        item: selectedDonationItem.name,
        quantity: selectedDonationItem.quantity,
        recipient: recipient,
        date: new Date().toISOString().split('T')[0]
      }]);
      
      setProducts(products.filter(p => p.id !== selectedDonationItem.id));
      setShowDonateModal(false);
      setSelectedDonationItem(null);
      
      setActivityLog(prev => [...prev, {
        id: prev.length + 1,
        user: loginForm.email,
        action: `donated ${selectedDonationItem.name} to ${recipient}`,
        timestamp: new Date().toISOString()
      }]);
      // 2. Update achievements on actions
      updateAchievements({ donations: profile.stats.donations + 1 });
    }
  };

  const handleIngredientSelect = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setRecipeError("Please select at least one ingredient");
      return;
    }

    setIsLoading(true);
    setRecipeError(null);

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Recipe generation error:', data);
        throw new Error(data.details || data.error || 'Failed to generate recipe');
      }

      setGeneratedRecipe(data.recipe);
      // 2. Update achievements on actions
      updateAchievements({ aiRecipes: profile.stats.aiRecipes + 1 });
    } catch (err) {
      console.error('Error in recipe generation:', err);
      setRecipeError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add this new function for handling profile edits
  const handleEditProfile = (newName, newAvatar) => {
    setProfile(prev => ({ ...prev, name: newName, avatar: newAvatar }));
    setShowEditProfileModal(false);
    triggerConfetti();
  };

  const [notifications, setNotifications] = useState([]);
  const [expiringItemsCount, setExpiringItemsCount] = useState(0);

  // Check for expiring items and show notifications
  useEffect(() => {
    const checkExpiringItems = () => {
      const expiringItems = products.filter(product => {
        const daysUntilExpiry = calculateDaysUntilExpiry(product.expiry);
        return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
      });

      setExpiringItemsCount(expiringItems.length);

      if (expiringItems.length > 0) {
        const notification = {
          id: Date.now(),
          type: 'warning',
          message: `${expiringItems.length} item${expiringItems.length > 1 ? 's' : ''} expiring within 3 days!`,
          items: expiringItems.map(item => ({
            name: item.name,
            daysLeft: calculateDaysUntilExpiry(item.expiry)
          }))
        };
        setNotifications(prev => [...prev, notification]);
      }
    };

    // Check immediately when component mounts
    checkExpiringItems();

    // Check every hour
    const interval = setInterval(checkExpiringItems, 3600000);

    return () => clearInterval(interval);
  }, [products]);

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes recipeAppear {
          0% { 
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes recipeSection {
          0% {
            transform: translateX(-30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes recipeItem {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-recipeAppear {
          animation: recipeAppear 0.5s ease-out;
        }
        .animate-recipeSection {
          animation: recipeSection 0.5s ease-out;
        }
        .animate-recipeItem {
          animation: recipeItem 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInProfile {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInProfile {
          animation: fadeInProfile 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes profileCard {
          0% { transform: scale(0.95) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-profileCard {
          animation: profileCard 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 0 0 0 #6BBF59; }
          50% { box-shadow: 0 0 30px 10px #6BBF59; }
        }
        .animate-avatarGlow {
          animation: avatarGlow 2s infinite;
        }
        @keyframes slideInProfile {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideInProfile {
          animation: slideInProfile 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes badgePop {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-badgePop {
          animation: badgePop 0.5s cubic-bezier(.4,0,.2,1);
        }
        .animate-badgeGrid {
          animation: fadeInProfile 1s 0.2s both;
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
                <div className="relative">
                  <button 
                    onClick={() => setNotifications([])} 
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <i className="fas fa-bell"></i>
                    {expiringItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                        {expiringItemsCount}
                      </span>
                    )}
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            )}
          </header>

          {/* Notifications */}
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`fixed top-20 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 transform transition-all duration-500 animate-slideInRight z-50 ${
                settings.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-triangle text-yellow-500 text-xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{notification.message}</p>
                  <div className="mt-2 space-y-1">
                    {notification.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-red-500">{item.daysLeft} days left</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          ))}

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
                        {subscriptionTier === "premium"
                          ? "Premium Plan"
                          : "Free Plan"}
                      </p>
                      {isTrialActive && (
                        <p className="text-sm text-green-600 mt-1">
                          {Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24))} days remaining in trial
                        </p>
                      )}
                      {subscriptionTier === "premium" && !isTrialActive && trialEndDate && (
                        <p className="text-sm text-blue-600 mt-1">
                          Subscription ends on {trialEndDate.toLocaleDateString()}
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
                      .filter((p) => {
                        const daysUntilExpiry = calculateDaysUntilExpiry(p.expiry);
                        return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
                      })
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
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                calculateDaysUntilExpiry(product.expiry) <= 1
                                  ? 'bg-red-500 animate-pulse'
                                  : calculateDaysUntilExpiry(product.expiry) === 2
                                    ? 'bg-yellow-600'
                                    : 'bg-yellow-400'
                              }`}></div>
                              <button
                                onClick={() => handleDonateItem(product)}
                                className="text-[#6BBF59] hover:text-[#5AA548]"
                              >
                                <i className="fas fa-gift"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {products.filter(p => calculateDaysUntilExpiry(p.expiry) <= 3 && calculateDaysUntilExpiry(p.expiry) > 0).length === 0 && (
                      <div className={`text-center py-4 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                        <p>No items expiring within the next 3 days!</p>
                      </div>
                    )}
                  </div>
                </div>

                {isLoggedIn && (
                  <div className={`${settings.darkMode ? "bg-gray-700" : "bg-white"} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover`}>
                    <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>Product Categories</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.slice(1).map((category, index) => (
                        <div
                          key={category}
                          className={`${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg hover:shadow-lg transition-all duration-300 card-hover`}
                          style={{
                            animation: `slideIn ${0.3 + index * 0.1}s ease-out`,
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className={`font-medium ${settings.darkMode ? "text-white" : "text-gray-800"}`}>{category}</span>
                            <span className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>{productStats[category]} items</span>
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
                            onClick={() => handleDonateItem(product)}
                            className="text-[#6BBF59] hover:text-[#5AA548]"
                          >
                            <i className="fas fa-gift"></i>
                          </button>
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
              <div className="p-4 space-y-6">
                {/* AI Recipe Generator Section */}
                <div className={`${settings.darkMode ? "bg-gray-700" : "bg-white"} rounded-xl p-6 shadow-lg`}>
                  <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    <i className="fas fa-robot text-[#6BBF59] mr-2"></i>
                    AI Recipe Generator
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className={`font-semibold mb-3 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                      Select Ingredients from Your Pantry
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleIngredientSelect(product.name)}
                          className={`p-3 rounded-lg border ${
                            selectedIngredients.includes(product.name)
                              ? 'bg-[#6BBF59]/20 border-[#6BBF59]'
                              : settings.darkMode 
                                ? 'bg-gray-800 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                          } hover:bg-[#6BBF59]/10 transition-colors`}
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <button
                      onClick={generateRecipe}
                      disabled={isLoading || selectedIngredients.length === 0}
                      className={`px-6 py-3 rounded-lg text-white font-semibold relative overflow-hidden ${
                        isLoading || selectedIngredients.length === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#6BBF59] hover:bg-[#5AA548]'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin mr-2">
                            <i className="fas fa-utensils"></i>
                          </div>
                          <span>Generating Recipe...</span>
                        </div>
                      ) : (
                        'Generate Recipe'
                      )}
                    </button>
                  </div>

                  {recipeError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
                      {recipeError}
                    </div>
                  )}

                  {generatedRecipe && (() => {
                    // Parse the recipe string for sections
                    const lines = generatedRecipe.split('\n').map(l => l.trim()).filter(Boolean);
                    let title = '';
                    let prepTime = '';
                    let cookTime = '';
                    let servings = '';
                    let ingredients = [];
                    let steps = [];
                    let tips = [];
                    let section = '';
                    const timeRegex = /([0-9]+\s*(min|mins|minutes|hr|hrs|hour|hours))/i;
                    
                    // First pass: Look for title and timing info
                    for (let line of lines) {
                      if (!title && /^\d+\./.test(line)) {
                        title = line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim();
                        continue;
                      }
                      if (/prep time/i.test(line)) {
                        const match = line.match(timeRegex);
                        prepTime = match ? match[1] : '-';
                        continue;
                      }
                      if (/cook time/i.test(line)) {
                        const match = line.match(timeRegex);
                        cookTime = match ? match[1] : '-';
                        continue;
                      }
                      if (/servings?/i.test(line)) {
                        const match = line.match(/\d+/);
                        servings = match ? match[0] : '-';
                        continue;
                      }
                    }

                    // Second pass: Parse ingredients, steps, and tips
                    for (let line of lines) {
                      if (/ingredient/i.test(line)) {
                        section = 'ingredients';
                        continue;
                      }
                      if (/step/i.test(line)) {
                        section = 'steps';
                        continue;
                      }
                      if (section === 'ingredients' && (line.startsWith('-') || /^[•*]/.test(line))) {
                        ingredients.push(line.replace(/^[-•*]\s*/, ''));
                        continue;
                      }
                      if (section === 'steps' && (line.match(/^\d+\./) || line.length > 0)) {
                        steps.push(line.replace(/^\d+\.\s*/, ''));
                        continue;
                      }
                      // If it's a tip or extra info
                      if (section && line && !line.startsWith('-') && !/^[•*]/.test(line) && !/^\d+\./.test(line)) {
                        tips.push(line);
                      }
                    }

                    // Ensure we have default values if not found
                    if (!prepTime) prepTime = '-';
                    if (!cookTime) cookTime = '-';
                    if (!servings) servings = '-';

                    return (
                      <div className={`${settings.darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-6 shadow-lg animate-recipeAppear`}> 
                        <div className="flex items-center justify-between mb-6">
                          <h3 className={`text-2xl font-extrabold w-full text-center ${settings.darkMode ? "text-white" : "text-gray-800"} animate-slideInRight`}>
                            <i className="fas fa-utensils text-[#6BBF59] mr-2 animate-bounce"></i>
                            {title || 'Generated Recipe'}
                          </h3>
                          <button 
                            onClick={() => setGeneratedRecipe(null)}
                            className={`absolute right-6 top-8 p-2 rounded-full hover:scale-110 transition-transform ${settings.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mb-6">
                          {prepTime && (
                            <div className="text-center">
                              <div className="font-semibold text-sm text-gray-500">Prep Time</div>
                              <div className={`font-bold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{prepTime}</div>
                            </div>
                          )}
                          {cookTime && (
                            <div className="text-center">
                              <div className="font-semibold text-sm text-gray-500">Cook Time</div>
                              <div className={`font-bold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{cookTime}</div>
                            </div>
                          )}
                          {servings && (
                            <div className="text-center">
                              <div className="font-semibold text-sm text-gray-500">Servings</div>
                              <div className={`font-bold text-lg ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>{servings}</div>
                            </div>
                          )}
                        </div>
                        {ingredients.length > 0 && (
                          <div className="mb-6">
                            <h4 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Ingredients</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              {ingredients.map((item, idx) => (
                                <li key={idx} className={settings.darkMode ? 'text-gray-200' : 'text-gray-700'}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {steps.length > 0 && (
                          <div>
                            <h4 className={`text-lg font-semibold mb-2 ${settings.darkMode ? 'text-white' : 'text-gray-800'}`}>Steps</h4>
                            <ol className="list-decimal pl-6 space-y-2">
                              {steps.map((step, idx) => (
                                <li key={idx} className={settings.darkMode ? 'text-gray-200' : 'text-gray-700'}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {tips.length > 0 && (
                          <div className="mt-6">
                            <h4 className={`text-lg font-bold mb-2 uppercase tracking-wide ${settings.darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Tips</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              {tips.map((tip, idx) => (
                                <li key={idx} className={settings.darkMode ? 'text-gray-300' : 'text-gray-600'}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-6 flex justify-end space-x-3 animate-fadeIn" style={{ animationDelay: '800ms' }}>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(generatedRecipe);
                            }}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform ${
                              settings.darkMode 
                                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                          >
                            <i className="fas fa-copy"></i>
                            <span>Copy Recipe</span>
                          </button>
                          <button
                            onClick={() => {
                              setRecipes(prev => [
                                ...prev,
                                {
                                  id: prev.length + 1,
                                  name: title || 'Generated Recipe',
                                  time: (prepTime && cookTime) ? `${prepTime} + ${cookTime}` : prepTime || cookTime || '',
                                  ingredients,
                                  image: "https://images.unsplash.com/photo-1601050591252-0c0a2a0c0a0a?w=500&auto=format&fit=crop&q=60"
                                }
                              ]);
                              setGeneratedRecipe(null);
                            }}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform ${
                              settings.darkMode 
                                ? "bg-[#6BBF59] hover:bg-[#5AA548] text-white" 
                                : "bg-[#6BBF59] hover:bg-[#5AA548] text-white"
                            }`}
                          >
                            <i className="fas fa-heart"></i>
                            <span>Save to Favorites</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Existing Recipes Section */}
                <div className={`${settings.darkMode ? "bg-gray-700" : "bg-white"} rounded-xl p-6 shadow-lg`}>
                  <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    <i className="fas fa-utensils text-[#6BBF59] mr-2"></i>
                    Saved Recipes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className={`${
                          settings.darkMode ? "bg-gray-800" : "bg-white"
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

            {activeTab === "donate" && (
              <div className="p-4 space-y-6">
                <div className={`${settings.darkMode ? "bg-gray-700" : "bg-white"} rounded-xl p-6 shadow-lg`}>
                  <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    <i className="fas fa-hands-helping text-[#6BBF59] mr-2"></i>
                    Donate & Share Hub - Abu Dhabi
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className={`${settings.darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} p-4 rounded-lg`}>
                      <h3 className="font-semibold mb-2">Your Impact</h3>
                      <div className="text-3xl font-bold text-[#6BBF59]">{donationHistory.length}</div>
                      <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>Items Donated</p>
                    </div>
                    <div className={`${settings.darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} p-4 rounded-lg`}>
                      <h3 className="font-semibold mb-2">Active Food Drives</h3>
                      <div className="text-3xl font-bold text-[#6BBF59]">{communityEvents.length}</div>
                      <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>Upcoming Events</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <button
                      onClick={() => setActiveTab("inventory")}
                      className="w-full bg-[#6BBF59] text-white py-3 rounded-lg hover:bg-[#5AA548] transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <i className="fas fa-gift"></i>
                      <span>Donate Items from Your Inventory</span>
                    </button>
                    <p className={`text-sm mt-2 text-center ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>Select items from your inventory to donate to local food banks</p>
                  </div>

                  <div className="mb-6">
                    <h3 className={`font-semibold mb-3 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>Local Food Banks & Charities</h3>
                    <div className="space-y-3">
                      {foodBanks.map(bank => (
                        <div key={bank.id} className={`${settings.darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} p-4 rounded-lg`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{bank.name}</h4>
                              <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>{bank.address}</p>
                              <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>{bank.hours}</p>
                              <a href={bank.website} target="_blank" rel="noopener noreferrer" className={`text-sm ${settings.darkMode ? "text-[#6BBF59]" : "text-[#6BBF59]"} hover:underline`}>
                                Visit Website
                              </a>
                            </div>
                            <span className={`text-sm ${settings.darkMode ? "text-[#6BBF59]" : "text-[#6BBF59]"}`}>{bank.distance}</span>
                          </div>
                          <div className="mt-2">
                            <p className={`text-sm font-medium ${settings.darkMode ? "text-white" : "text-gray-800"}`}>Accepted Items:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {bank.acceptedItems.map((item, index) => (
                                <span key={index} className={`text-xs px-2 py-1 rounded ${settings.darkMode ? "bg-[#6BBF59]/20 text-[#6BBF59]" : "bg-[#6BBF59]/10 text-[#6BBF59]"}`}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Community Events & Food Drives</h3>
                    <div className="space-y-3">
                      {communityEvents.map(event => (
                        <div key={event.id} className={`${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-gray-500">{event.date}</p>
                              <p className="text-sm text-gray-500">{event.location}</p>
                              <p className="text-sm mt-2">{event.description}</p>
                            </div>
                            <span className="text-xs bg-[#6BBF59]/10 text-[#6BBF59] px-2 py-1 rounded">
                              {event.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Your Donation History</h3>
                    <div className="space-y-3">
                      {donationHistory.map(donation => (
                        <div key={donation.id} className={`${settings.darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{donation.item}</h4>
                              <p className="text-sm text-gray-500">Quantity: {donation.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{donation.recipient}</p>
                              <p className="text-sm text-gray-500">{donation.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
              onClick={() => setActiveTab("donate")}
              className={`flex-1 p-4 flex flex-col items-center ${
                activeTab === "donate"
                  ? settings.darkMode
                    ? "text-[#F4B400]"
                    : "text-[#6BBF59]"
                  : settings.darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              } hover:scale-110 transition-all duration-300`}
            >
              <i className="fas fa-hands-helping text-xl mb-1"></i>
              <span className="text-xs">Donate</span>
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
            {isLoggedIn && (
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 p-4 flex flex-col items-center ${
                  activeTab === "profile"
                    ? settings.darkMode
                      ? "text-[#F4B400]"
                      : "text-[#6BBF59]"
                    : settings.darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                } hover:scale-110 transition-all duration-300`}
              >
                <i className="fas fa-user text-xl mb-1"></i>
                <span className="text-xs">Profile</span>
              </button>
            )}
          </nav>

          {/* Add this condition before the profile section */}
          {activeTab === "profile" && !isLoggedIn && (
            <div className="p-4 text-center">
              <div className="bg-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <i className="fas fa-lock text-4xl text-purple-600 mb-4 floating"></i>
                <h3 className="font-bold mb-2">Login Required</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please login to view your profile and achievements
                </p>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {activeTab === "profile" && isLoggedIn && (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 animate-fadeInProfile">
              <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative animate-profileCard">
                {/* Gen Z Motivational Quote */}
                {(() => {
                  const praiseQuotes = [
                    "You're absolutely slaying it! 🚀",
                    "Certified Zero Waste Icon ✨",
                    "Legendary Pantry Pro 🏆",
                    "You're a real one 💯",
                    "Eco Hero in the making 🌱",
                    "Major flex: Saving the planet! 😎",
                    "Vibe check: Immaculate 🌈",
                    "You understood the assignment! 📦",
                    "Lowkey inspiring everyone 👀",
                    "Main character energy! 🎬",
                    "You're built different 🔥",
                    "No cap, you're crushing it! 🧢",
                    "Sustainability goals, fr fr 🙌",
                    "Big W for the environment! 🥇",
                  ];
                  const randomQuote = praiseQuotes[Math.floor(Math.random() * praiseQuotes.length)];
                  return (
                    <div className="mb-8 text-center">
                      <span
                        className={
                          `block text-2xl md:text-2xl font-extrabold mb-2 select-none ` +
                          (settings.darkMode
                            ? 'text-white'
                            : 'text-gray-900')
                        }
                        style={{letterSpacing: '0.01em'}}
                      >
                        <span className={`text-4xl align-top font-extrabold mr-2 ${settings.darkMode ? 'text-[#6BBF59]' : 'text-[#6BBF59]'}`}>"
                        </span>
                        <span className={`italic font-semibold ${settings.darkMode ? 'text-[#E0E7EF]' : 'text-[#22223B]'}`}>{randomQuote}</span>
                        <span className={`text-4xl align-bottom font-extrabold ml-2 ${settings.darkMode ? 'text-[#4A90E2]' : 'text-[#4A90E2]'}`}>"</span>
                      </span>
                    </div>
                  );
                })()}
                {/* Animated Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-[#6BBF59] flex items-center justify-center text-5xl font-bold text-white border-4 border-[#4A90E2] shadow-lg animate-avatarGlow">
                      {profile.avatar}
                    </div>
                    <span className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-[#6BBF59] shadow animate-bounce">PRO</span>
                  </div>
                  <h2 className="text-3xl font-extrabold mt-4 mb-1 animate-slideInProfile">{profile.name}</h2>
                  <p className="text-gray-500 animate-slideInProfile" style={{ animationDelay: '100ms' }}>{profile.email}</p>
                  <button 
                    onClick={() => setShowEditProfileModal(true)}
                    className="mt-3 px-4 py-2 rounded-lg bg-[#4A90E2] text-white font-semibold hover:bg-[#357ABD] transition-all animate-slideInProfile" 
                    style={{ animationDelay: '200ms' }}
                  >
                    Edit Profile
                  </button>
                </div>
                {/* Achievements Grid */}
                <h3 className="text-xl font-bold mb-3 text-center animate-slideInProfile" style={{ animationDelay: '300ms' }}>Achievements</h3>
                <div className="grid grid-cols-3 gap-4 mb-8 animate-badgeGrid">
                  {/* Badge helper */}
                  {[
                    { key: 'firstDonation', icon: '🎁', label: 'First Donation', desc: 'Donate any item.' },
                    { key: 'wasteWarrior', icon: '🦸‍♂️', label: 'Waste Warrior', desc: 'Remove 10 expired items.' },
                    { key: 'inventoryMaster', icon: '📦', label: 'Inventory Master', desc: 'Add 20+ items.' },
                    { key: 'zeroWasteWeek', icon: '🌱', label: 'Zero Waste Week', desc: 'No expired items for 7 days.' },
                    { key: 'pantryPro', icon: '🏅', label: 'Pantry Pro', desc: 'Add 50+ items.' },
                    { key: 'recipeExplorer', icon: '🧑‍🍳', label: 'Recipe Explorer', desc: 'Generate 5+ AI recipes.' },
                    { key: 'communityHelper', icon: '🤝', label: 'Community Helper', desc: 'Donate 5+ times.' },
                  ].map((badge, i) => (
                    <div key={badge.key} className="flex flex-col items-center group relative">
                      {profile.achievements[badge.key] ? (
                        <span className="text-4xl animate-badgePop cursor-pointer" title={badge.desc}>{badge.icon}</span>
                      ) : (
                        <span className="text-4xl text-gray-300 relative cursor-not-allowed animate-badgePop">
                          <span className="absolute -top-2 -right-2 text-base text-gray-400"><i className="fas fa-lock"></i></span>
                          {badge.icon}
                        </span>
                      )}
                      <span className={`text-xs mt-1 font-semibold ${profile.achievements[badge.key] ? 'text-[#6BBF59]' : 'text-gray-400'}`}>{badge.label}</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {badge.desc}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Stats Section */}
                <div className="mb-4 animate-slideInProfile" style={{ animationDelay: '400ms' }}>
                  <h4 className="font-semibold mb-2 text-center">Your Stats</h4>
                  <div className="space-y-2">
                    {/* Animated counters */}
                    <StatBar label="Donations" value={profile.stats.donations} max={5} color="#6BBF59" />
                    <StatBar label="Expired Items Removed" value={profile.stats.expiredRemoved} max={10} color="#F4B400" />
                    <StatBar label="Items Added" value={profile.stats.itemsAdded} max={50} color="#4A90E2" />
                    <StatBar label="Zero Waste Streak (days)" value={profile.stats.zeroWasteStreak} max={7} color="#6BBF59" />
                    <StatBar label="AI Recipes Generated" value={profile.stats.aiRecipes} max={5} color="#4A90E2" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showEditProfileModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className={`${settings.darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-6 w-full max-w-md`}>
                <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                  Edit Profile
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Avatar Initial</label>
                    <input
                      type="text"
                      maxLength="1"
                      value={profile.avatar}
                      onChange={(e) => setProfile(prev => ({ ...prev, avatar: e.target.value.toUpperCase() }))}
                      className="w-full p-2 border rounded text-center text-2xl"
                      placeholder="A"
                    />
                  </div>
                  <button
                    onClick={() => handleEditProfile(profile.name, profile.avatar)}
                    className="w-full bg-[#6BBF59] text-white py-2 rounded hover:bg-[#5AA548]"
                  >
                    Save Changes
                  </button>
                </div>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          {showLoginModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className={`${settings.darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 animate-slideInRight`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    Welcome Back!
                  </h2>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"}`}
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        settings.darkMode 
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                          : "bg-white border-gray-300 focus:border-[#4A90E2]"
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"
                        }`}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-medium hover:bg-[#357ABD] transition-colors transform hover:scale-[1.02]"
                  >
                    Login
                  </button>
                  <div className="text-center">
                    <p className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowRegisterModal(true);
                        }}
                        className="text-[#4A90E2] hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showRegisterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className={`${settings.darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 animate-slideInRight`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                    Create Account
                  </h2>
                  <button
                    onClick={() => {
                      setShowRegisterModal(false);
                      setError(null);
                    }}
                    className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"}`}
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        settings.darkMode 
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                          : "bg-white border-gray-300 focus:border-[#4A90E2]"
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"
                        }`}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`block text-sm font-medium ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className={`w-full p-3 rounded-lg border transition-colors ${
                        settings.darkMode 
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                          : "bg-white border-gray-300 focus:border-[#4A90E2]"
                      }`}
                      required
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg animate-shake">
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-medium hover:bg-[#357ABD] transition-colors transform hover:scale-[1.02]"
                  >
                    Create Account
                  </button>
                  <div className="text-center">
                    <p className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowRegisterModal(false);
                          setShowLoginModal(true);
                        }}
                        className="text-[#4A90E2] hover:underline font-medium"
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showPlansModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className={`${settings.darkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-6 w-full max-w-md`}>
                <h2 className={`text-xl font-bold mb-4 ${settings.darkMode ? "text-white" : "text-gray-800"}`}>
                  Choose Your Plan
                </h2>
                <div className="space-y-4">
                  <div className={`w-full p-4 border rounded-lg ${settings.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}>
                    <h3 className="font-bold">Free Plan</h3>
                    <p className={`text-sm ${settings.darkMode ? "text-gray-300" : "text-gray-500"}`}>Basic features with 30-day premium trial</p>
                    <ul className={`mt-2 space-y-1 text-sm ${settings.darkMode ? "text-gray-200" : "text-gray-600"}`}>
                      <li>• Up to 30 items</li>
                      <li>• Basic inventory management</li>
                      <li>• Manual item entry</li>
                      <li>• 30 free barcode scans</li>
                      <li className="text-green-600 font-medium">• 30-day premium trial included!</li>
                    </ul>
                    <button
                      onClick={() => handleSelectPlan("free")}
                      className={`mt-4 w-full py-2 border rounded hover:bg-gray-50 ${settings.darkMode ? "border-[#6BBF59] text-[#6BBF59] hover:bg-[#6BBF59]/10" : "border-[#4A90E2] text-[#4A90E2]"}`}
                    >
                      Start Free Plan with Trial
                    </button>
                  </div>
                  <div className="w-full p-4 bg-[#4A90E2] text-white rounded-lg">
                    <h3 className="font-bold">Premium Plan</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-sm">AED 6.99/month</p>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">or</span>
                      <p className="text-sm">AED 79.99/year</p>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Unlimited items</li>
                      <li>• Smart home integration</li>
                      <li>• Unlimited barcode scanning</li>
                      <li>• Family sharing</li>
                      <li>• Premium support</li>
                    </ul>
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => handleSelectPlan("premium")}
                        className="w-full py-2 bg-white text-[#4A90E2] rounded hover:bg-gray-50"
                      >
                        Get Premium Monthly
                      </button>
                      <button
                        onClick={() => handleSelectPlan("premium-yearly")}
                        className="w-full py-2 bg-white/20 text-white rounded hover:bg-white/30"
                      >
                        Get Premium Yearly (Save 5%)
                      </button>
                    </div>
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
          {showDonateModal && selectedDonationItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className={`${settings.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-xl p-8 w-full max-w-md shadow-2xl relative`}>
                <button
                  onClick={() => { setShowDonateModal(false); setSelectedDonationItem(null); }}
                  className={`absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors ${settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"}`}
                  aria-label="Close"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-gift text-[#6BBF59]"></i>
                  Donate Item
                </h2>
                <div className="mb-4">
                  <p className="font-semibold">Item:</p>
                  <div className="mb-2">{selectedDonationItem.name} <span className="text-sm text-gray-400">(Qty: {selectedDonationItem.quantity})</span></div>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Choose Recipient:</p>
                  <select
                    className={`w-full p-2 rounded border ${settings.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    onChange={e => setSelectedDonationItem({ ...selectedDonationItem, recipient: e.target.value })}
                    value={selectedDonationItem.recipient || ''}
                  >
                    <option value="" disabled>Select a food bank</option>
                    {foodBanks.map(bank => (
                      <option key={bank.id} value={bank.name}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => { setShowDonateModal(false); setSelectedDonationItem(null); }}
                    className={`px-4 py-2 rounded-lg font-medium border ${settings.darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedDonationItem.recipient}
                    onClick={() => handleConfirmDonation(selectedDonationItem.recipient)}
                    className={`px-4 py-2 rounded-lg font-medium ${selectedDonationItem.recipient ? 'bg-[#6BBF59] text-white hover:bg-[#5AA548]' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                  >
                    Confirm Donation
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Product Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className={`${settings.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-xl p-8 w-full max-w-md shadow-2xl relative`}>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors ${settings.darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"}`}
                  aria-label="Close"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-plus text-[#4A90E2]"></i>
                  Add New Item
                </h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddProduct();
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Item Name
                      </label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        placeholder="Enter item name"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.filter((cat) => cat !== "All").map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        placeholder="Enter quantity"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={newProduct.expiryDate}
                        onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Storage Location
                      </label>
                      <select
                        value={newProduct.location}
                        onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                        className={`w-full p-3 rounded-lg border transition-colors ${
                          settings.darkMode 
                            ? "bg-gray-700 border-gray-600 text-white focus:border-[#4A90E2]" 
                            : "bg-white border-gray-300 focus:border-[#4A90E2]"
                        }`}
                        required
                      >
                        <option value="">Select storage location</option>
                        <option value="pantry">Pantry</option>
                        <option value="refrigerator">Refrigerator</option>
                        <option value="freezer">Freezer</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className={`px-4 py-2 rounded-lg font-medium border ${settings.darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-medium bg-[#4A90E2] text-white hover:bg-[#357ABD]"
                    >
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfettiBurst trigger={showConfetti} />
    </>
  );
}

// StatBar component
function StatBar({ label, value, max, color }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{value} / {max}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, background: color }}
        ></div>
      </div>
    </div>
  );
}

export default MainComponent;
