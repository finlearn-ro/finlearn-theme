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
      combinedLogoutUrl =
        "https://auth.finlearn.ro/realms/prod/protocol/openid-connect/logout?client_id=openedx&post_logout_redirect_uri=http%3A%2F%2Ffinlearn.ro%2Fwp-login.php%3Faction%3Dlogout";

    function redirectToLogout() {
      window.location.href = combinedLogoutUrl;
    }

    var doRedirect = redirectToLogout;

    if ($iframes.length === 0) {
      doRedirect();
    } else {
      $iframes.allLoaded(function () {
        doRedirect();
      });
    }
  });
})(jQuery);
