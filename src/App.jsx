import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ElectronicsView } from './components/ElectronicsView';
import { FashionView } from './components/FashionView';
import { BeautyView } from './components/BeautyView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { LoginView } from './components/LoginView';

const initialNotification = null;

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [pendingView, setPendingView] = useState(null);
  const [notification, setNotification] = useState(initialNotification);

  useEffect(() => {
    const savedCart = localStorage.getItem('globalmarket_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }

    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setAuthUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse auth user', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('globalmarket_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!notification?.visible) return undefined;

    const timer = setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setAuthUser(null);
    setPendingView(null);
    setActiveView('home');
    setNotification({
      message: 'Signed out successfully.',
      subText: 'You can sign in again anytime.',
      visible: true,
    });
  };

  const handleAddToCart = (product, selectedSize = null, selectedColor = null) => {
    setCartItems((previousItems) => {
      const existing = previousItems.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existing) {
        return previousItems.map((item) => {
          if (
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return [
        ...previousItems,
        {
          product,
          quantity: 1,
          selectedSize,
          selectedColor,
          checked: true,
        },
      ];
    });

    setNotification({
      message: `${product.name} added to cart.`,
      subText: 'You can review or checkout anytime.',
      visible: true,
    });
  };

  const handleViewChange = (view) => {
    if ((view === 'cart' || view === 'checkout') && !authUser) {
      setPendingView(view);
      setNotification({
        message: 'Sign in required',
        subText: 'Please log in to continue.',
        visible: true,
      });
      setActiveView('login');
      return;
    }
    setActiveView(view);
  };

  const handleLoginSuccess = (redirectTo) => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setAuthUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse auth user', error);
      }
    }

    if (redirectTo && redirectTo !== 'login') {
      setPendingView(null);
      setActiveView(redirectTo);
      return;
    }

    setActiveView('home');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'electronics':
        return <ElectronicsView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'fashion':
        return <FashionView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'beauty':
        return <BeautyView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'cart':
        return <CartView cartItems={cartItems} setCartItems={setCartItems} setView={handleViewChange} authUser={authUser} />;
      case 'checkout':
        return <CheckoutView cartItems={cartItems} setCartItems={setCartItems} setView={handleViewChange} authUser={authUser} />;
      case 'login':
        return <LoginView pendingView={pendingView} onLoginSuccess={handleLoginSuccess} />;
      case 'home':
      default:
        return <HomeView setView={handleViewChange} />;
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header
        activeView={activeView}
        setView={handleViewChange}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        authUser={authUser}
        onLogout={handleLogout}
      />
      <main className="mx-auto max-w-7xl p-4 py-8">{renderActiveView()}</main>
      <Footer setView={handleViewChange} />
      {notification?.visible && (
        <div className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-xl shadow-slate-900/10">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-10 w-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">i</div>
            <div>
              <p className="font-semibold text-slate-900">{notification.message}</p>
              {notification.subText && <p className="mt-1 text-sm text-slate-600">{notification.subText}</p>}
            </div>
            <button
              type="button"
              onClick={() => setNotification((prev) => (prev ? { ...prev, visible: false } : null))}
              className="ml-auto text-slate-400 hover:text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
