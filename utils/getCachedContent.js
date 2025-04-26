function getCachedItem(key, expiryMs) {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
  
    const { value, timestamp } = JSON.parse(item);
    const now = new Date().getTime();
  
    if (now - timestamp > expiryMs) {
      sessionStorage.removeItem(key);
      return null;
    }
  
    return value;
  }
  