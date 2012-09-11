
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('albums', { title: 'My Albums', viewModel:'albums'  });
};

exports.pictures = function(req, res){
	res.render('pictures', { title: 'My Pictures', viewModel:'pictures' });
};

exports.albums = function(req, res){
	res.render('albums', { title: 'My Albums', viewModel:'albums'  });
};

exports.pictureviewer = function(req, res){
	res.render('pictureviewer', { title: 'Picture Viewer', viewModel:'pictureviewer'  });
};