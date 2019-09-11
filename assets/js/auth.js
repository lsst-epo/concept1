"use strict";

// https://auth0.com/docs/quickstart/spa/vanillajs

window.addEventListener('load', function() {
    
    var webAuth = new auth0.WebAuth({
        domain: 'lsstepo.auth0.com',
        clientID: 'aA4nezvlbC9WncfECwCNFtTQAC1al0cg',
        responseType: 'token id_token',
        audience: 'https://lsstepo.auth0.com/userinfo',
        scope: 'openid nickname',
        redirectUri: window.location.href
    });

    var loginBtn = document.getElementById('account');

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        webAuth.authorize();
    });
    
    
    /*    
    var lock = new Auth0Lock('aA4nezvlbC9WncfECwCNFtTQAC1al0cg', 'lsstepo.auth0.com', {
        auth: {
            params: {
                scope: 'openid nickname'
            }
        }
    });

    lock.on('authenticated', function (authResult) {
        lock.getProfile(authResult.idToken, function (error, profile) {
            if (error) {
                // Handle error
                return false;
            }
            sessionStorage.setItem('auth0_id_token', authResult.idToken);
            sessionStorage.setItem('auth0_profile', JSON.stringify(profile));
        });
    });
    */
    
});