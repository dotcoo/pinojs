import pino from '../src/index';

// const app = new pino.Server();
const app = pino.server;

app.use(async(req, res, next) => {
  req.haha = 'm1';
  await next(req, res);
});

app.use(async(req, res, next) => {
  req.haha += 'm2';
  await next(req, res);
});

app.get('/blog/:bid/comment/:cid', async(req, res, next) => {
  req.haha += 'blog_comment';
  res.send(`blog_comment, bid: ${req.params.bid}, cid: ${req.params.cid}`);
});

app.get('/blog/:bid', async(req, res, next) => {
  req.haha += 'blog';
  res.send(`blog, bid: ${req.params.bid}`);
});

app.post('/blog/:bid', async(req, res, next) => {
  req.haha += 'post blog';
  res.json({
    request: 'post blog',
    params: {
      bid: req.params.bid,
    },
    query: {
      name: req.query.name,
      site: req.query.site,
    },
    form: {
      username: req.form.username,
      password: req.form.password,
    },
  });
});

// (async() => {
//   console.log((await app.handle(new Request('/blog/1'))).body);
//   console.log((await app.handle(new Request('/blog/2/comment/1'))).body);
// })();

export default app;
