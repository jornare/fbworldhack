var picturesViewModel = function(){
	var self = this;
	this.pictures = ko.observableArray([]);
	
	this.getPictures = function(){

		facebook.getPhotosFromAlbum(getParameterByName('album_id')).done(function(response){
			self.pictures(response.data);
		});
		
	};
	
	this.showPicture = function( url ){
		socket.emit('showpicture',{url:url});
	};
	
};

$(document).ready(function(){
	var vm = new picturesViewModel();
	ko.applyBindings(vm);
	
	socket.on('showpicture', function(data){
		if(data && data.url){
			//alert('show: '+data.url);
		}
		
	});	

	facebook.ready = function() {
		vm.getPictures();
	};	
});