// calculates reading time for an article; returns string; 
// returns "1 minute read" for empty string
export function generateReadingTime(text: string) {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} minute read`;
}
