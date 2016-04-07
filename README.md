# ot-ware
one at time middle(ware) layer.

###why?
in one of my projects i needed to have a middleware whose run functions block were executable one at time.

###usage
```javascript
var otware = require('otware');
var middleware = otware()
  .use(function (req, res, next) {
    res.x = 'hello';
    next();
  })
  .use(function (req, res, next) {
    res.y = 'world';
	//wait 3 seconds before call the next function
	setTimeout(function(){
		next();
	},3000);
  });

//first run
middleware.run({}, {}, function (err, req, res) {
  res.x; // "hello"
  res.y; // "world"
});

//this run will be executed after the first run(about 3 seconds after)
middleware.run({}, {}, function (err, req, res) {
  res.x; // "hello"
  res.y; // "world"
});
```

###installation



