

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
  res.render('reader/history', {
    pageTitle: 'History'
  });
}