// const app = new pino.Server();
const app = pino.server;

app.addRequestMiddleware(async(req) => {
  req.haha = 'm1';
});

app.addRequestMiddleware(async(req) => {
  req.haha += 'm2';
});

app.get('/blog/:bid/comment/:cid', async(req) => {
  const res = req.response;
  req.haha += 'blog_comment';
  res.headers['Content-Type'] = 'text/html';
  res.send(`blog_comment, bid: ${req.params.bid}, cid: ${req.params.cid}`);
});

app.get('/blog/:bid', async(req) => {
  const res = req.response;
  req.haha += 'blog';
  res.headers['Content-Type'] = 'application/json';
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
  res.headers['Content-Type'] = 'application/json';
  res.json({
    request: 'post blog',
    params: req.params,
    query: req.query,
    form: req.form,
    formData: req.formData,
    json: req.json,
  });
});
