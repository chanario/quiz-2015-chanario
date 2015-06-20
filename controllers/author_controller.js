//GET /author
exports.creditos= function(req, res) {
          res.render('author/creditos',
            {
              datos:'Chanario',
              nombre_foto:'miFoto.jpg',
              nombre_video:'miVideo.webm'
            }
          );
};
