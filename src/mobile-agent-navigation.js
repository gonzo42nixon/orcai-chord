(function () {
  'use strict';

  const MOBILE_QUERY = '(max-width: 900px)';
  const PANEL_CLASSES = ['mobile-panel-left', 'mobile-panel-right', 'mobile-panel-agent'];

  function initMobileNavigation() {
    if (document.getElementById('mobileNavigation')) return;

    const body = document.body;
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const sidebarLeft = document.getElementById('sidebarLeft');
    const sidebarRight = document.getElementById('sidebarRight');
    const sidebarAgent = document.getElementById('sidebarAgent');
    const agentSuggestions = document.getElementById('agentPromptSuggestions');

    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'mobile-sheet-backdrop';
    backdrop.setAttribute('aria-label', 'Geöffnetes Navigationsfenster schließen');

    const context = document.createElement('div');
    context.className = 'mobile-nav-context';
    context.setAttribute('aria-live', 'polite');
    context.innerHTML = '<span aria-hidden="true">◎</span><strong id="mobileNavigationContext">Gesamtübersicht</strong>';

    const nav = document.createElement('nav');
    nav.id = 'mobileNavigation';
    nav.className = 'mobile-nav';
    nav.setAttribute('aria-label', 'Mobile Hauptnavigation');
    nav.innerHTML = [
      ['left', '☰', 'Übersicht'],
      ['search', '⌕', 'Suchen'],
      ['agent', '🤖', 'Agent'],
      ['right', '◎', 'Auswahl']
    ].map(([panel, icon, label]) =>
      '<button type="button" class="mobile-nav-button" data-mobile-panel="' + panel + '" aria-expanded="false">' +
        '<span aria-hidden="true">' + icon + '</span><span>' + label + '</span>' +
      '</button>'
    ).join('');

    body.append(backdrop, context, nav);

    const quickNavigation = document.createElement('div');
    quickNavigation.className = 'mobile-agent-navigation';
    quickNavigation.setAttribute('aria-label', 'Schnellnavigation des Architektur-Agenten');
    quickNavigation.innerHTML = [
      ['overview', '⌂ Übersicht'],
      ['systems', '▦ Systeme'],
      ['connections', '⇄ Verbindungen'],
      ['up', '← Eine Ebene höher']
    ].map(([action, label]) =>
      '<button type="button" class="mobile-agent-quick-action" data-agent-nav="' + action + '">' + label + '</button>'
    ).join('');
    if (sidebarAgent && agentSuggestions && agentSuggestions.parentNode === sidebarAgent) { sidebarAgent.insertBefore(quickNavigation, agentSuggestions); } else if (agentSuggestions && agentSuggestions.parentNode) { agentSuggestions.parentNode.insertBefore(quickNavigation, agentSuggestions); }

    function isMobile() {
      return mediaQuery.matches;
    }

    function activePanel() {
      if (body.classList.contains('mobile-panel-left')) return 'left';
      if (body.classList.contains('mobile-panel-right')) return 'right';
      if (body.classList.contains('mobile-panel-agent')) return 'agent';
      return '';
    }

    function updateNavigationState() {
      const active = activePanel();
      body.classList.toggle('mobile-panel-open', Boolean(active));
      nav.querySelectorAll('[data-mobile-panel]').forEach((button) => {
        const selected = button.dataset.mobilePanel === active;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-expanded', String(selected));
      });
    }

    function closePanels(options) {
      const settings = options || {};
      const hadAgentOpen = body.classList.contains('mobile-panel-agent');
      PANEL_CLASSES.forEach((className) => body.classList.remove(className));
      if (settings.closeAgent || (hadAgentOpen && !settings.keepAgentOpen)) {
        if (typeof window.toggleOrcaiAgentDrawer === 'function') {
          window.toggleOrcaiAgentDrawer(false);
        }
      }
      updateNavigationState();
    }

    function openPanel(panel) {
      if (!isMobile()) return;
      const wasActive = activePanel() === panel;
      closePanels({ keepAgentOpen: panel === 'agent' });
      if (wasActive) return;

      const panelClass = 'mobile-panel-' + panel;
      body.classList.add(panelClass);
      const target = panel === 'left' ? sidebarLeft : panel === 'right' ? sidebarRight : sidebarAgent;
      if (target) target.classList.remove('collapsed');
      if (panel === 'agent' && typeof window.toggleOrcaiAgentDrawer === 'function') {
        window.toggleOrcaiAgentDrawer(true);
      }
      updateNavigationState();
      window.requestAnimationFrame(() => {
        const focusTarget = target && target.querySelector('textarea, input, button');
        if (focusTarget) focusTarget.focus({ preventScroll: true });
      });
    }

    nav.addEventListener('click', (event) => {
      const button = event.target.closest('[data-mobile-panel]');
      if (!button) return;
      const panel = button.dataset.mobilePanel;
      if (panel === 'search') {
        closePanels({ closeAgent: true });
        document.getElementById('btnOmniSearch')?.click();
        return;
      }
      openPanel(panel);
    });

    backdrop.addEventListener('click', () => closePanels({ closeAgent: true }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMobile() && activePanel()) closePanels({ closeAgent: true });
    });

    document.getElementById('btnLeftCollapse')?.addEventListener('click', () => {
      body.classList.remove('mobile-panel-left');
      updateNavigationState();
    });
    document.getElementById('btnRightCollapse')?.addEventListener('click', () => {
      body.classList.remove('mobile-panel-right');
      updateNavigationState();
    });
    document.getElementById('btnAgentCollapse')?.addEventListener('click', () => {
      body.classList.remove('mobile-panel-agent');
      if (typeof window.toggleOrcaiAgentDrawer === 'function') {
        window.toggleOrcaiAgentDrawer(false);
      }
      updateNavigationState();
    });

    document.getElementById('btnAgentToggle')?.addEventListener('click', () => {
      if (!isMobile()) return;
      window.requestAnimationFrame(() => {
        if (!body.classList.contains('mobile-panel-agent')) openPanel('agent');
      });
    });

    quickNavigation.addEventListener('click', (event) => {
      const button = event.target.closest('[data-agent-nav]');
      if (!button) return;
      const action = button.dataset.agentNav;
      if (action === 'overview') {
        if (typeof window.resetAllFilters === 'function') window.resetAllFilters();
        closePanels();
      } else if (action === 'systems') {
        window.askOrcaiAgent?.('Zeige mir eine kompakte Systemübersicht');
      } else if (action === 'connections') {
        window.askOrcaiAgent?.('Zeige die wichtigsten Verbindungen der aktuellen Auswahl');
      } else if (action === 'up') {
        const params = new URLSearchParams(window.location.search);
        const processId = params.get('proc');
        const domainId = params.get('domain');
        if (params.has('int') && processId && typeof PROCESSES_DATA !== 'undefined') {
          const process = PROCESSES_DATA.find((item) => item.id === processId);
          if (process && typeof window.setDrilldownProcess === 'function') window.setDrilldownProcess(process, true);
        } else if (processId && typeof PROCESSES_DATA !== 'undefined') {
          const process = PROCESSES_DATA.find((item) => item.id === processId);
          if (process && typeof window.setDrilldownProcess === 'function') window.setDrilldownProcess(process);
        } else if (domainId && typeof window.setDrilldownDomain === 'function') {
          window.setDrilldownDomain(domainId);
        } else if (typeof window.resetAllFilters === 'function') {
          window.resetAllFilters();
        }
        closePanels();
      }
    });

    if (sidebarAgent) {
      sidebarAgent.addEventListener('click', (event) => {
        if (!isMobile()) return;
        const navigationAction = event.target.closest('.agent-chip-sys, .agent-chip-proc, .agent-chip-integ, .agent-chip-hitl, .agent-chip-ux');
        if (!navigationAction) return;
        window.setTimeout(() => closePanels(), 180);
      });
    }

    function updateContext() {
      const target = document.getElementById('mobileNavigationContext');
      if (!target) return;
      const params = new URLSearchParams(window.location.search);
      const level = params.get('int') || params.get('proc') || params.get('node') || params.get('edge') || params.get('domain');
      const heading = document.getElementById('headerDrilldownTitle')?.textContent.replace(/\s+/g, ' ').trim();
      target.textContent = level ? (level + (heading ? ' · ' + heading : '')) : (heading || 'Gesamtübersicht');
    }

    const headerTitle = document.getElementById('headerDrilldownTitle');
    if (headerTitle) new MutationObserver(updateContext).observe(headerTitle, { childList: true, subtree: true, characterData: true });
    window.addEventListener('popstate', updateContext);

    const labels = {
      integSearchInput: 'Integrationen durchsuchen',
      connSearchInput: 'Verbindungen durchsuchen',
      sysSearchInput: 'Systeme durchsuchen',
      agentHistorySearchInput: 'Chat-Verlauf durchsuchen',
      agentTextInput: 'Frage an den Architektur-Agenten'
    };
    Object.entries(labels).forEach(([id, label]) => {
      const element = document.getElementById(id);
      if (element && !element.getAttribute('aria-label')) element.setAttribute('aria-label', label);
    });

    function handleBreakpoint() {
      if (!isMobile()) {
        PANEL_CLASSES.forEach((className) => body.classList.remove(className));
        updateNavigationState();
      }
      updateContext();
    }
    mediaQuery.addEventListener?.('change', handleBreakpoint);
    handleBreakpoint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNavigation, { once: true });
  } else {
    initMobileNavigation();
  }
})();
