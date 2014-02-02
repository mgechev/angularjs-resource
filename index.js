var express = require('express'),
    app = express();

var users = [
  { id: 1, name: 'foo',    job: 'foo' },
  { id: 2, name: 'bar',    job: 'bar' },
  { id: 3, name: 'baz',    job: 'baz' },
  { id: 4, name: 'foobar', job: 'bar' }
];

function getUserById(id) {
  for (var i = users.length - 1; i >= 0; i--) {
    if (users[i].id === id) {
      return users[i];
    }
  }
  return null;
}

app.use('/', express.static(__dirname + '/public'));

app.get('/users', function (req, res) {
  res.send(JSON.stringify(users));
});

app.get('/users/:userid', function (req, res) {
  var user = getUserById(parseInt(req.params.userid));
  setTimeout(function () {
    res.send(JSON.stringify(user));
  }, 1000);
});

app.listen(3000);