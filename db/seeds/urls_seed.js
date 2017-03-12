
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('urls').del()
    .then(function () {
      // Inserts seed entries
      return knex('urls').insert([
        {id: 1, original: 'www.google.com', shortened: 'www.go.com', requests: 53, visits: 4},
        {id: 2, original: 'www.yahoo.com', shortened: 'www.ya.com', requests: 5, visits: 35},
        {id: 3, original: 'www.bing.com', shortened: 'www.bi.com', requests: 57, visits: 753},
        {id: 4, original: 'www.reddit.com', shortened: 'www.re.com', requests: 753, visits: 53},
        {id: 5, original: 'www.newyorktimes.com', shortened: 'www.nyt.com', requests: 95, visits: 75}
      ]);
    });
};
