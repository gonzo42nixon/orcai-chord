(function () {
  'use strict';

  // Public fallback config for ORCAI project orcai-54321
  window.ORCAI_FIREBASE_CONFIG = window.ORCAI_FIREBASE_CONFIG || {
    apiKey: "AIzaSyBcf73eGeniQLgk-KkVNiNfx1EhQncW8sM",
    authDomain: "orcai-54321.firebaseapp.com",
    projectId: "orcai-54321",
    storageBucket: "orcai-54321.firebasestorage.app",
    messagingSenderId: "1015956913704",
    appId: "1:1015956913704:web:b9ca175f80775e1555ff1d"
  };

  const root = document.getElementById('orcaiAccount');
  const trigger = document.getElementById('orcaiAccountTrigger');
  const photo = document.getElementById('orcaiAccountPhoto');
  const fallback = document.getElementById('orcaiAccountFallback');
  const menu = document.getElementById('orcaiAccountMenu');
  const identity = document.getElementById('orcaiAccountIdentity');
  const name = document.getElementById('orcaiAccountName');
  const email = document.getElementById('orcaiAccountEmail');
  const action = document.getElementById('orcaiAccountAction');
  const accountError = document.getElementById('orcaiAccountError');
  const gate = document.getElementById('orcaiAuthGate');
  const gateLogin = document.getElementById('orcaiGateLogin');
  const gateError = document.getElementById('orcaiGateError');
  let currentUser = null;

  if (!root || !gate) {
    return;
  }

  // Check if Firebase is available
  if (!window.firebase || !window.firebase.auth) {
    console.warn('[ORCAI Quad-Chord Auth] Firebase Auth SDK nicht geladen. Standalone-Vorschau aktiv.');
    document.body.classList.remove('orcai-auth-pending');
    gate.hidden = true;
    return;
  }

  document.body.classList.add('orcai-auth-pending');

  function showError(message) {
    const text = message || '';
    if (accountError) {
      accountError.textContent = text;
      accountError.hidden = !text;
    }
    if (gateError) {
      gateError.textContent = text;
      gateError.hidden = !text;
    }
  }

  function closeMenu() {
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    if (menu) menu.hidden = false;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    if (action) action.focus({ preventScroll: true });
  }

  function render(user) {
    currentUser = user || null;
    showError('');
    root.dataset.authenticated = user ? 'true' : 'false';
    if (identity) identity.hidden = !user;
    if (gate) gate.hidden = Boolean(user);
    document.body.classList.toggle('orcai-auth-pending', !user);

    if (name) name.textContent = user?.displayName || 'ORCAI Benutzer';
    if (email) email.textContent = user?.email || '';
    if (action) action.textContent = user ? 'Abmelden' : 'Mit Google anmelden';

    const label = user ? `Konto: ${user.displayName || user.email || 'angemeldet'}` : 'Mit Google anmelden';
    if (trigger) {
      trigger.setAttribute('aria-label', label);
      trigger.title = label;
    }
    if (fallback) {
      fallback.textContent = (user?.displayName || user?.email || 'G').trim().charAt(0).toUpperCase() || 'G';
    }
    if (photo) {
      if (user?.photoURL) {
        photo.hidden = false;
        photo.src = user.photoURL;
      } else {
        photo.hidden = true;
        photo.removeAttribute('src');
      }
    }
    if (!user && gateLogin) {
      gateLogin.focus({ preventScroll: true });
    }
  }

  async function signIn() {
    showError('');
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await auth.signInWithPopup(provider);
    } catch (error) {
      if (!['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(error?.code)) {
        showError(error?.message || 'Google-Anmeldung fehlgeschlagen.');
      }
    }
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(window.ORCAI_FIREBASE_CONFIG);
    }
    const auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(error => console.warn('[ORCAI Quad-Chord Auth]', error));

    if (photo) {
      photo.addEventListener('error', () => {
        photo.hidden = true;
        photo.removeAttribute('src');
      });
    }

    if (trigger) {
      trigger.addEventListener('click', () => currentUser ? (menu?.hidden ? openMenu() : closeMenu()) : signIn());
    }

    if (gateLogin) {
      gateLogin.addEventListener('click', signIn);
    }

    if (action) {
      action.addEventListener('click', async () => {
        try {
          if (currentUser) {
            await auth.signOut();
            closeMenu();
          } else {
            closeMenu();
            await signIn();
          }
        } catch (error) {
          showError(error?.message || 'Kontoaktion fehlgeschlagen.');
        }
      });
    }

    document.addEventListener('pointerdown', event => {
      if (!root.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu && !menu.hidden) {
        closeMenu();
        if (trigger) trigger.focus({ preventScroll: true });
      }
    });

    auth.onAuthStateChanged(render, error => showError(error?.message || 'Anmeldestatus konnte nicht geladen werden.'));
    window.orcaiQuadChordAuth = auth;
  } catch (err) {
    console.warn('[ORCAI Quad-Chord Auth] Init Error:', err);
    document.body.classList.remove('orcai-auth-pending');
    if (gate) gate.hidden = true;
  }
})();
