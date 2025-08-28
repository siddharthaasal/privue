// calculates reading time for an article; returns string; 
// returns "1 minute read" for empty string
export function generateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime}`;
}


export function formatDate(iso: string) {
    // "2025-04-20" -> "Apr 20, 2025"
    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

export function siteUrl() {
    // set VITE_SITE_URL in .env for correct absolute share links in prod
    return import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? window.location.origin;
}