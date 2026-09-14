(function () {
  'use strict';

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

  document.body.classList.add('orcai-auth-pending');

  function showError(message) {
    const text = message || '';
    accountError.textContent = text;
    accountError.hidden = !text;
    gateError.textContent = text;
    gateError.hidden = !text;
  }

  function closeMenu() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    action.focus({ preventScroll: true });
  }

  function render(user) {
    currentUser = user || null;
    showError('');
    root.dataset.authenticated = user ? 'true' : 'false';
    identity.hidden = !user;
    gate.hidden = Boolean(user);
    document.body.classList.toggle('orcai-auth-pending', !user);
    name.textContent = user?.displayName || 'ORCAI Benutzer';
    email.textContent = user?.email || '';
    action.textContent = user ? 'Abmelden' : 'Mit Google anmelden';
    const label = user ? `Konto: ${user.displayName || user.email || 'angemeldet'}` : 'Mit Google anmelden';
    trigger.setAttribute('aria-label', label);
    trigger.title = label;
    fallback.textContent = (user?.displayName || user?.email || 'G').trim().charAt(0).toUpperCase() || 'G';
    if (user?.photoURL) {
      photo.hidden = false;
      photo.src = user.photoURL;
    } else {
      photo.hidden = true;
      photo.removeAttribute('src');
    }
    if (!user) gateLogin.focus({ preventScroll: true });
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

  if (!root || !window.firebase || !window.ORCAI_FIREBASE_CONFIG) {
    document.body.classList.remove('orcai-auth-pending');
    gate.hidden = false;
    showError('Die zentrale ORCAI-Anmeldung konnte nicht initialisiert werden.');
    return;
  }

  if (!firebase.apps.length) firebase.initializeApp(window.ORCAI_FIREBASE_CONFIG);
  const auth = firebase.auth();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(error => console.warn('[ORCAI Quad-Chord Auth]', error));

  photo.addEventListener('error', () => {
    photo.hidden = true;
    photo.removeAttribute('src');
  });
  trigger.addEventListener('click', () => currentUser ? (menu.hidden ? openMenu() : closeMenu()) : signIn());
  gateLogin.addEventListener('click', signIn);
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
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      trigger.focus({ preventScroll: true });
    }
  });
  auth.onAuthStateChanged(render, error => showError(error?.message || 'Anmeldestatus konnte nicht geladen werden.'));
  window.orcaiQuadChordAuth = auth;
})();
