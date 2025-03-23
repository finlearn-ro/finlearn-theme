/**
 * JS for the logout page.
 *
 * This script waits for all iframes on the page to load before redirecting the user
 * to the Finlearn logout URL, which in turn redirects the user to the specified URL.
 */
(function($) {
    'use strict';

    $(function() {
        var $iframeContainer = $('#iframeContainer'),
            $iframes = $iframeContainer.find('iframe'),
            // The final destination after logout.
            redirectUrl = $iframeContainer.data('redirect-url'),
            // Base Finlearn logout URL.
            logoutUrl = "https://auth.finlearn.ro/realms/prod/protocol/openid-connect/logout?client_id=openedx";

        // Append the redirect URI so that after logout the user is sent to redirectUrl.
        logoutUrl += "&redirect_uri=" + encodeURIComponent(redirectUrl);

        function doRedirect() {
            window.location.href = logoutUrl;
        }

        if ($iframes.length === 0) {
            doRedirect();
        } else {
            $iframes.allLoaded(function() {
                doRedirect();
            });
        }
    });
}(jQuery));
