import React, { useEffect } from 'react'
import "react-quill/dist/quill.snow.css";
import { trackPageView } from "../utils/gtag";

const About = () => {
  useEffect(() => {
    try { trackPageView({ page_title: "About" }); } catch (err) { console.debug("GA About skipped", err); }
  }, []);

  return (
  <>
  <p className="ql-align-center">HELL</p><p className="ql-align-center"></p><p>MY NAMEI<span className="ql-size-huge">S ISMAIL dlamini </span><strong className="ql-size-huge">an </strong></p>
  </>
  
    
  )
}

export default About
