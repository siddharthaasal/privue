// src/cookies/loaders/loadGA.ts

export const loadGA = (measurementId: string) => {
  if ((window as any).gaLoaded) return;
  (window as any).gaLoaded = true;

  const s1 = document.createElement('script');
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s1);

  const s2 = document.createElement('script');
  s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
  `;
  document.head.appendChild(s2);
};
