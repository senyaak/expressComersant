/// <reference path="../../typings/index.d.ts"/>

declare var superagent;
type Superagent = typeof superagent;

superagent.get('/testRequest').end((err, res) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log(res);
  }
});
superagent.get();
