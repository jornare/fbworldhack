window.fbAsyncInit = function() {
	FB.init({
	  appId      : '141834915958969', // App ID
	  channelUrl : '//localhost:3000/channel.html', // Channel File
	  status     : true, // check login status
	  cookie     : true, // enable cookies to allow the server to access the session
	  xfbml      : true  // parse XFBML
	});

	$("#login").click(function() {
		facebook.login();
	});

	// listen for and handle auth.statusChange events
	FB.Event.subscribe('auth.statusChange', facebook.handleStatusChange);

	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    // the user is logged in and has authenticated your
	    // app, and response.authResponse supplies
	    // the user's ID, a valid access token, a signed
	    // request, and the time the access token 
	    // and signed request each expire
	    var uid = response.authResponse.userID;
	    var accessToken = response.authResponse.accessToken;

	    console.log('already logged in');
	  } else if (response.status === 'not_authorized') {
	    // the user is logged in to Facebook, 
	    // but has not authenticated your app
	    console.log('logged in, not authenticated app')
	  } else {
	    // the user isn't logged in to Facebook.
	    console.log('not logged in')
	  }
	 });
};

// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

window.facebook = {

	login: function () {
		FB.login(function(response) {
		   if (response.authResponse) {
		     console.log('Welcome!  Fetching your information.... ');
		     FB.api('/me', function(response) {
		       console.log('Good to see you, ' + response.name + '.');
		     });
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 }, { scope: 'user_photos,friends_photos,publish_actions' });
	},

	handleStatusChange: function(response) {
	  if (response.authResponse) {
	    // user has auth'd your app and is logged into Facebook
	    FB.api('/me', function(me){
	      if (me.name) {
	      }
	    })
	  } else {
	    // user has not auth'd your app, or is not logged into Facebook
	  }
	},

	getMyAlbums: function () {

	},

	getAlbumsForUser: function (userId) {

	}

};
