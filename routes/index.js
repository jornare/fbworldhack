
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('albums', { title: 'My Albums' });
};

exports.pictures = function(req, res){
	res.render('pictures', { title: 'My Pictures' });
};

exports.albums = function(req, res){
	res.render('albums', { title: 'My Albums' });
};

exports.pictureviewer = function(req, res){
	res.render('pictureviewer', { title: 'Picture Viewer' });
};