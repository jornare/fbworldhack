var picturesviewerViewModel = function(){
	var self = this;
	this.picture = ko.observable('');
	
	
	this.showPicture = function( url ){
		this.picture(url);
		
	};
	
};
$(document).ready(function(){
	var vm = new picturesviewerViewModel();
	ko.applyBindings(vm);
	
	socket.on('showpicture', function(data){
		if(data && data.url){
			vm.showPicture(data.url);
		}
		console.log(data);
	});
});