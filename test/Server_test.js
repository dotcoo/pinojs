// const app = new pino.Server();
const app = pino.server;

app.use(async(req, next) => {
  req.haha = 'm1';
  await next(req);
});

app.use(async(req, next) => {
  req.haha += 'm2';
  await next(req);
});

app.get('/blog/:bid/comment/:cid', async(req) => {
  const res = req.response;
  req.haha += 'blog_comment';
  res.headers.set('Content-Type', 'text/html');
  res.send(`blog_comment, bid: ${req.params.bid}, cid: ${req.params.cid}`);
});

app.get('/blog/:bid', async(req) => {
  const res = req.response;
  req.haha += 'blog';
  res.headers.set('Content-Type', 'application/json');
  res.json({
    request: 'post blog',
    params: req.params,
    query: req.query,
    form: req.form,
    formData: req.formData,
    json: req.json,
  });
});

app.post('/blog/:bid', async(req) => {
  const res = req.response;
  req.haha += 'post blog';
  res.headers.set('Content-Type', 'application/json');
  res.json({
    request: 'post blog',
    params: req.params,
    query: req.query,
    form: req.form,
    formData: req.formData,
    json: req.json,
  });
});
