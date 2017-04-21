define(function() {
    var config = {};

    /* Select the buttons displayed on the main page to create new collaborative sessions
     * Existing types : pad, code, poll, slide
     */
    config.availablePadTypes = ['pad', 'code', 'slide', 'poll'];

    /*  Cryptpad apps use a common API to display notifications to users
     *  by default, notifications are hidden after 5 seconds
     *  You can change their duration here (measured in milliseconds)
     */
    config.notificationTimeout = 5000;

    config.USE_FS_STORE = false;
    config.USE_HOMEPAGE_TABLE = true;

    return config;
});
