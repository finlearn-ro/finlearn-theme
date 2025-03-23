/**
 * JS for the logout page.
 *
 * This script waits for all iframes on the page to load before redirecting the user
 * to the WordPress logout URL.
 */
(function ($) {
  "use strict";

  $(function () {
    var $iframeContainer = $("#iframeContainer"),
      $iframes = $iframeContainer.find("iframe"),
      // WordPress logout URL
      wordpressLogoutUrl = "http://finlearn.ro/wp-login.php?action=logout",
      // Base Finlearn logout URL.
      finlearnLogoutUrl =
        "https://auth.finlearn.ro/realms/prod/protocol/openid-connect/logout?client_id=openedx";

    // Redirect to WordPress logout URL directly
    function redirectToWordpressLogout() {
      window.location.href = wordpressLogoutUrl;
    }

    // If you need to logout from both systems, uncomment this function and use it instead
    // Append the WordPress logout as the redirect URI so user is sent there after Finlearn logout
    function redirectViaFinlearn() {
      var logoutUrl = finlearnLogoutUrl;
      logoutUrl += "&redirect_uri=" + encodeURIComponent(wordpressLogoutUrl);
      window.location.href = logoutUrl;
    }

    // Choose which redirect function to use based on your requirements
    var doRedirect = redirectToWordpressLogout; // or redirectViaFinlearn if needed

    if ($iframes.length === 0) {
      doRedirect();
    } else {
      $iframes.allLoaded(function () {
        doRedirect();
      });
    }
  });
})(jQuery);
