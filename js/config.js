// Configuration for different environments
const config = {
    development: {
        API_BASE_URL: 'http://localhost:3000'
    },
    production: {
        // UPDATE THIS WITH YOUR DEPLOYED BACKEND URL
        API_BASE_URL: 'https://your-backend-app.render.com'
    }
};

// Detect environment
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('localhost');

// Export the current environment config
const currentConfig = isDevelopment ? config.development : config.production;

// Make it globally available
window.APP_CONFIG = currentConfig;
