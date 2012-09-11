var albumsViewModel = function(){
	var self = this;
	this.albums = ko.observableArray([]);
	
	
	this.getAlbums = function(){

		facebook.getMyAlbums().done(function (response) {
			console.log(response);
			self.albums(response.data);
		});
	};
	
};
$(document).ready(function(){
	var vm = new albumsViewModel();
	ko.applyBindings(vm);

	facebook.ready = function() {
		vm.getAlbums();
	};	
});