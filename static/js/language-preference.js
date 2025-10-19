/**
 * Language Preference Manager
 * Stores user's language selection in localStorage and auto-redirects on subsequent visits
 */
(function() {
    'use strict';

    // Configuration
    const STORAGE_KEY = 'hugo_preferred_language';
    const SESSION_KEY = 'language_redirected';

    /**
     * Initialize the language preference system
     */
    function init() {
        // Check and redirect on page load (before DOM ready for faster redirect)
        checkAndRedirect();

        // Attach click handlers after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachLanguageSwitchers);
        } else {
            attachLanguageSwitchers();
        }
    }

    /**
     * Check if we should redirect to user's preferred language
     */
    function checkAndRedirect() {
        try {
            // Don't redirect if we already did this session
            if (sessionStorage.getItem(SESSION_KEY)) {
                return;
            }

            const preferredLang = getStoredLanguage();
            const currentLang = getCurrentLanguage();

            // Redirect if preference exists and differs from current language
            if (preferredLang && preferredLang !== currentLang && isValidLanguage(preferredLang)) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                redirectToLanguage(preferredLang);
            }
        } catch (e) {
            // Silently fail if localStorage/sessionStorage is unavailable
            console.warn('Language preference: Storage unavailable', e);
        }
    }

    /**
     * Attach click event listeners to all language switch links
     */
    function attachLanguageSwitchers() {
        const links = document.querySelectorAll('.language-switch-link');

        links.forEach(function(link) {
            link.addEventListener('click', handleLanguageClick);
        });
    }

    /**
     * Handle click on language switch link
     * @param {Event} e - Click event
     */
    function handleLanguageClick(e) {
        const lang = e.currentTarget.getAttribute('data-lang');

        if (lang) {
            try {
                setStoredLanguage(lang);
                // Clear session flag so future page loads can redirect
                sessionStorage.removeItem(SESSION_KEY);
            } catch (e) {
                console.warn('Language preference: Could not save preference', e);
            }
        }

        // Let the link navigate normally (don't prevent default)
    }

    /**
     * Get the stored language preference from localStorage
     * @returns {string|null} Language code or null
     */
    function getStoredLanguage() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    /**
     * Store the language preference in localStorage
     * @param {string} lang - Language code to store
     */
    function setStoredLanguage(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            throw e;
        }
    }

    /**
     * Get the current language from the URL path
     * @returns {string} Current language code (e.g., 'en', 'zh-cn')
     */
    function getCurrentLanguage() {
        const path = window.location.pathname;

        // Match language code pattern: /en/ or /zh-cn/ at start of path
        const match = path.match(/^\/([a-z]{2}(-[a-z]{2})?)\//i);

        if (match) {
            return match[1].toLowerCase();
        }

        // If no language in path, assume default language (root path)
        // This handles cases like "/" which might be the default language
        return getDefaultLanguage();
    }

    /**
     * Get default language from HTML lang attribute or fallback
     * @returns {string} Default language code
     */
    function getDefaultLanguage() {
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang) {
            // Extract primary language code (e.g., 'en-US' -> 'en')
            return htmlLang.split('-')[0].toLowerCase();
        }
        return 'en'; // Fallback
    }

    /**
     * Check if a language code is valid by looking for available language links
     * @param {string} lang - Language code to validate
     * @returns {boolean} True if valid
     */
    function isValidLanguage(lang) {
        // Check if any language switch link exists for this language
        const link = document.querySelector('.language-switch-link[data-lang="' + lang + '"]');
        return link !== null;
    }

    /**
     * Redirect to a specific language, preserving the current path
     * @param {string} targetLang - Target language code
     */
    function redirectToLanguage(targetLang) {
        const currentPath = window.location.pathname;
        const currentLang = getCurrentLanguage();
        const search = window.location.search;
        const hash = window.location.hash;

        let newPath;

        // Check if current path has a language prefix
        if (currentPath.match(/^\/[a-z]{2}(-[a-z]{2})?\//i)) {
            // Replace existing language: /en/about -> /zh-cn/about
            newPath = currentPath.replace(
                /^\/[a-z]{2}(-[a-z]{2})?\//i,
                '/' + targetLang + '/'
            );
        } else {
            // Add language prefix: /about -> /zh-cn/about
            newPath = '/' + targetLang + currentPath;
        }

        // Perform redirect
        window.location.href = newPath + search + hash;
    }

    // Initialize when script loads
    init();

})();
