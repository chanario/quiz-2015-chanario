//GET /author
exports.creditos= function(req, res) {
  res.render('author/creditos',
    {
        datos:'Chanario',
        nombre_foto:'miFoto.jpg',
        nombre_video:'miVideo.webm',
        errors: []  // para que funcione el control de errores en el body. Se debía haber metido desde el commit "validar pregunta"
    }
  );
};
