var picturesviewerViewModel = function(){
	var self = this;
	this.picture = '';
	
	
	this.showPicture = function( url ){
		self.albums.push(
		{id:1, src:'http://3.vgc.no/drfront/images/2012/09/11/c=44,41,761,391;w=588;h=302;56372.jpg'}
		);
	};
	
};
$(document).ready(function(){
	var vm = new picturesviewerViewModel();
	ko.applyBindings(vm);
	
	socket.on('showpicture', function(data){
		if(data && data.url){
			vm.showPicture(data.url);
		}
		
	});
});