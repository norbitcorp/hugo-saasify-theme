/**
 * Language Preference Manager
 * Stores user's language selection in localStorage and auto-redirects on subsequent visits
 * Supports automatic language detection via VisitorAPI
 */
(function() {
    'use strict';

    // Configuration
    const STORAGE_KEY = 'hugo_preferred_language';
    const SESSION_KEY = 'language_redirected';

    // Get VisitorAPI project ID from Hugo config (injected via template)
    const VISITOR_API_PID = window.HUGO_VISITOR_API_PID || null;

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
                console.log('Language preference: Already redirected this session, skipping');
                return;
            }

            const preferredLang = getStoredLanguage();
            const currentLang = getCurrentLanguage();

            console.log('Language preference check:', {
                preferredLang: preferredLang || 'none',
                currentLang: currentLang,
                visitorApiConfigured: !!VISITOR_API_PID
            });

            // If user has a stored preference, use it
            if (preferredLang && preferredLang !== currentLang && isValidLanguage(preferredLang)) {
                console.log('Language preference: Redirecting to stored preference:', preferredLang);
                sessionStorage.setItem(SESSION_KEY, 'true');
                redirectToLanguage(preferredLang);
                return;
            }

            // If no stored preference and VisitorAPI is configured, call it every time
            if (!preferredLang && VISITOR_API_PID) {
                detectLanguageViaVisitorAPI();
            } else if (!preferredLang) {
                console.log('Language preference: No stored preference and VisitorAPI not configured');
            }
        } catch (e) {
            // Silently fail if localStorage/sessionStorage is unavailable
            console.warn('Language preference: Storage unavailable', e);
        }
    }

    /**
     * Detect user's language using VisitorAPI
     */
    function detectLanguageViaVisitorAPI() {
        console.log('VisitorAPI: Calling API to detect language...');

        // VisitorAPI implementation
        var VisitorAPI = function(projectId, successCallback, errorCallback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === 200) {
                            successCallback(response.data);
                        } else {
                            errorCallback(response.status, response.result);
                        }
                    } catch (e) {
                        errorCallback(0, 'Failed to parse response');
                    }
                }
            };
            xhr.open("GET", "https://api.visitorapi.com/api/?pid=" + projectId);
            xhr.send(null);
        };

        // Call VisitorAPI
        VisitorAPI(
            VISITOR_API_PID,
            function(data) {
                handleVisitorAPISuccess(data);
            },
            function(errorCode, errorMessage) {
                console.warn('VisitorAPI error:', errorCode, errorMessage);
            }
        );
    }

    /**
     * Handle successful VisitorAPI response
     * @param {Object} data - VisitorAPI response data
     */
    function handleVisitorAPISuccess(data) {
        console.log('VisitorAPI: Received data:', data);

        // Get languages from response (e.g., ["en", "eng"])
        var languages = data.languages || [];

        if (languages.length === 0) {
            console.log('VisitorAPI: No languages detected in response');
            return;
        }

        console.log('VisitorAPI: Detected languages:', languages);

        // Try to match visitor's language to available Hugo languages
        // Match using first 2 characters of language code (e.g., "en" matches "en", "zh" matches "zh-cn")
        var detectedLang = null;

        for (var i = 0; i < languages.length; i++) {
            var visitorLang = languages[i].toLowerCase();
            // Get first 2 characters of the visitor's language code
            var langPrefix = visitorLang.substring(0, 2);

            // Get all available language links to find matching Hugo language
            var languageLinks = document.querySelectorAll('.language-switch-link');

            for (var j = 0; j < languageLinks.length; j++) {
                var hugoLang = languageLinks[j].getAttribute('data-lang');
                if (hugoLang) {
                    // Get first 2 characters of Hugo language code
                    var hugoPrefix = hugoLang.substring(0, 2);

                    // Match based on first 2 characters
                    if (langPrefix === hugoPrefix) {
                        detectedLang = hugoLang;
                        console.log('VisitorAPI: Matched language:', visitorLang, '(' + langPrefix + ') ->', hugoLang);
                        break;
                    }
                }
            }

            if (detectedLang) {
                break;
            }
        }

        // If we detected a valid language and it's different from current, redirect
        if (detectedLang) {
            var currentLang = getCurrentLanguage();
            console.log('VisitorAPI: Detected lang:', detectedLang, 'Current lang:', currentLang);

            if (detectedLang !== currentLang) {
                console.log('VisitorAPI: Storing preference and redirecting to:', detectedLang);

                // Store the detected language as preference
                setStoredLanguage(detectedLang);

                // Mark session to prevent redirect loop
                sessionStorage.setItem(SESSION_KEY, 'true');

                // Redirect to detected language
                redirectToLanguage(detectedLang);
            } else {
                console.log('VisitorAPI: Already on detected language, no redirect needed');
            }
        } else {
            console.log('VisitorAPI: No matching Hugo language found for detected languages');
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
