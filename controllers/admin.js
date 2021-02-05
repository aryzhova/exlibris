
exports.getAddBook = (req, res, next) => {
  res.render('admin/add-book', {
    pageTitle: 'Add Book'
  });
}

exports.postAddBook = (req, res, next) => {
  res.redirect('/');
}

exports.getPastDue = (req, res, next) => {
  res.render('admin/pastdue', { 
    pageTitle: 'Items past due'
  });
}

exports.getHolds = (req, res, next) => {
  res.render('admin/holds', {
    pageTitle: 'Holds'
  });
}