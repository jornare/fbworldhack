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
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 }, { scope: 'user_photos,friends_photos,publish_actions' });
	},

	cacheMyInfo: function () {
	     FB.api('/me', function(response) {
	       console.log('Good to see you, ' + response.name + '.');
	       facebook.me = response;
	     });
	},

	handleStatusChange: function(response) {
	  if (response.authResponse) {
	    // user has auth'd your app and is logged into Facebook
	    FB.api('/me', function(me){
	      facebook.cacheMyInfo();
	    })
	  } else {
	    // user has not auth'd your app, or is not logged into Facebook
	  }
	},

	getMyAlbums: function () {
		return facebook.getAlbumsForUser(facebook.me.id);
	},

	getAlbumsForUser: function (userId) {
		var deferred = $.Deferred();

		FB.api('/' + userId + '/albums', function(response) {
			deferred.resolve(response);
		});

		return deferred;
	},

	getPhotosFromAlbum: function (albumId) {
		var deferred = $.Deferred();

		FB.api('/' + albumId + '/photos', function(response) {
			deferred.resolve(response);
		});

		return deferred;
	},

	getPhotoById: function (id) {
		var deferred = $.Deferred();

		FB.api('/' + id, function(response) {
			deferred.resolve(response);
		});

		return deferred;	
	},

	getPhotoUrl: function (id) {
		return facebook.getPhotoUrlWithSize(id, 'normal');
	},

	getPhotoUrlWithSize: function (id, size) {
		return 'https://graph.facebook.com/' + id + '/picture?type=' + size;
	},

	publishViewAlbumAction: function (albumId) {
		var deferred = $.Deferred();

		FB.api('/me/social-photos:view?photo_album=http://localhost:3000/album/' + albumId, 'POST', {}, function (response) {
			deferred.resolve(response);
		});

		return deferred;
	}

};