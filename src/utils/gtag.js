// Lightweight Google Analytics (gtag) helper
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || null;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;
  if (window.gtag) return; // already initialized

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());
  // disable automatic page_view - we'll send manually
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
};

export const trackPageView = (payload = {}) => {
  if (!window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
};

export const trackEvent = (action, params = {}) => {
  if (!window.gtag) return;
  window.gtag("event", action, params);
};

export default {
  initGA,
  trackPageView,
  trackEvent,
};
