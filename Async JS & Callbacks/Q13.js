// Start loading
const loadingInterval = setInterval(() => {
    console.log("Loading...");
}, 1000);

// Stop loading after 5 seconds
setTimeout(() => {
    clearInterval(loadingInterval);
    console.log("Loaded successfully!");
}, 5000);
