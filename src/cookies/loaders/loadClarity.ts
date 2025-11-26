// src/cookies/loaders/loadClarity.ts

export const loadClarity = (projectId: string) => {
  if ((window as any).clarityLoaded) return;
  (window as any).clarityLoaded = true;

  const script = document.createElement('script');
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/${projectId}";
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script");
  `;
  document.head.appendChild(script);
};
