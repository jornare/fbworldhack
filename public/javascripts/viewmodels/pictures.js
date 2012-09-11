var picturesViewModel = function(){
	var self = this;
	this.pictures = ko.observableArray();
	
	this.getPictures = function(){
		
		
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
			vm.showPicture(data.url);
		}
		
	});
});