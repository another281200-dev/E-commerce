/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

export const LoginView = ({ pendingView, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState(null);
  const [authError, setAuthError] = useState(null);
  const signupSectionRef = useRef(null);
  const loginSectionRef = useRef(null);

  useEffect(() => {
    const scriptId = 'vismeforms-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setAuthError(null);
    setLoginMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      setLoginMessage(`Welcome back, ${data.user.name || data.user.email}`);
      setPassword('');
      onLoginSuccess(pendingView ?? 'home');
    } catch (error) {
      setAuthError(error.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setAuthError(null);
    setRegisterMessage(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      setRegisterMessage('Account created successfully. Welcome!');
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      onLoginSuccess(pendingView ?? 'home');
    } catch (error) {
      setAuthError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-start">
        <div ref={loginSectionRef} className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl lg:max-w-xl">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500">Sign in to access your saved cart, order history, and personalized recommendations.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-10 space-y-6" id="site-login-form">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700">Email address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button type="submit" className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700">
              Sign In
            </button>
          </form>

          {authError && (
            <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
              {authError}
            </div>
          )}

          {loginMessage && (
            <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
              {loginMessage}
            </div>
          )}

          <div className="mt-10 border-t border-slate-200 pt-6">
            <h2 className="text-sm font-semibold text-slate-900">New here?</h2>
            <p className="mt-2 text-sm text-slate-500">Use the signup form below to create an account instantly.</p>
            <button
              type="button"
              onClick={() => signupSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Need an account? Sign up
            </button>
          </div>
        </div>

        <div ref={signupSectionRef} className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl lg:flex-1">
          <div className="mb-6 space-y-3">
            <h2 className="text-2xl font-bold text-slate-900">Sign Up</h2>
            <p className="text-sm text-slate-500">Complete the secure registration form below to join GlobalMarket.</p>
          </div>

          <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Register securely</h3>
            <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-5" id="site-register-form">
              <div>
                <label htmlFor="register-name" className="block text-sm font-semibold text-slate-700">Full name</label>
                <input
                  id="register-name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="register-email" className="block text-sm font-semibold text-slate-700">Email address</label>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="register-password" className="block text-sm font-semibold text-slate-700">Password</label>
                <input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <button type="submit" className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition hover:bg-indigo-700">
                Create account
              </button>
            </form>

            {registerMessage && (
              <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
                {registerMessage}
              </div>
            )}
          </div>

          <div className="text-sm text-slate-500 mb-4">Or use the embedded signup widget below for an alternate registration flow.</div>

          <div
            className="visme_d"
            data-title="Ecommerce Sign Up Form"
            data-url="p9npjzro-ecommerce-sign-up-form?fullPage=true"
            data-domain="forms"
            data-full-page="true"
            data-min-height="100vh"
            data-form-id="187344"
          />

          <div className="mt-6 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => loginSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
