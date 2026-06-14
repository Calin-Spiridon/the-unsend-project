export const GA_ID = 'G-N0T70YM712';

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
}

export function trackPurchase(sessionId: string) {
  trackEvent('purchase', {
    transaction_id: sessionId,
    value: 1.00,
    currency: 'EUR',
    items: [{
      item_id: 'time_capsule',
      item_name: 'Time Capsule',
      price: 1.00,
      quantity: 1,
    }],
  });
}

export function trackCapsuleOpened() {
  trackEvent('capsule_opened');
}

export function trackBeginCheckout() {
  trackEvent('begin_checkout', {
    value: 1.00,
    currency: 'EUR',
  });
}