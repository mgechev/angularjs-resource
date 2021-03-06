var express = require('express'),
    app = express(),
    lastId = 4;

var users = [
  { id: 1, name: 'foo',    job: 'foo' },
  { id: 2, name: 'bar',    job: 'bar' },
  { id: 3, name: 'baz',    job: 'baz' },
  { id: 4, name: 'foobar', job: 'bar' }
];

function getUserIdx(id) {
  for (var i = users.length - 1; i >= 0; i--) {
    if (users[i].id === id) {
      return i;
    }
  }
  return null;
}

app.use('/', express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/users', function (req, res) {
  res.send(JSON.stringify(users));
});

app.get('/users/:userid', function (req, res) {
  var userIdx = getUserIdx(parseInt(req.params.userid)),
      user = users[userIdx];
  setTimeout(function () {
    res.send(JSON.stringify(user));
  }, 1000);
});

app.del('/users/:userid', function (req, res) {
  var userIdx = getUserIdx(parseInt(req.params.userid));
  users.splice(userIdx, 1);
  res.send('OK');
});

app.post('/users', function (req, res) {
  var user = {
    id: ++lastId,
    name: req.body.name,
    job: req.body.job
  };
  users.push(user);
  res.send(JSON.stringify(user));
});

app.listen(3000);