
exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'All books'
  });
}

exports.getSearch = (req, res, next) => {
  res.render('search', {
    pageTitle: 'Search'
  });
}

exports.getMyRequests = (req, res, next) => {
  res.render('reader/my-requests', {
    pageTitle: 'My Requests'
  });
}

exports.getHistory = (req, res, next) => {
  res.render('history', {
    pageTitle: 'History'
  });
}