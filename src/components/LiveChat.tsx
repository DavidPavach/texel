"use client"

import { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";

    // Initialize Smartsupp object
    const smartsupp = document.createElement("script");
    smartsupp.type = "text/javascript";
    smartsupp.text = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = 'fa2cc4b206583914b3f77a1cb37e4170b549ef5b';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c,s);
      })(document);
    `;

    // Append both scripts to the document body
    document.body.appendChild(smartsupp);
    document.body.appendChild(script);

    // Cleanup function to remove scripts on unmount
    return () => {
      document.body.removeChild(smartsupp);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main></main>
  );
};

export default LiveChat;