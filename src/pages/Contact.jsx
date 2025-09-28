import React, { useEffect } from 'react'
import { trackPageView } from "../utils/gtag";

const Contact = () => {
  useEffect(() => {
    try { trackPageView({ page_title: "Contact" }); } catch (err) { console.debug("GA Contact skipped", err); }
  }, []);

  return (
    <div>
      
    </div>
  )
}

export default Contact
