/** fetches a json, defaults to pages.json */
module.exports = function(source = 'pages', options) {
  console.log(__dirname + '/../_data/');
  return options.fn(require(__dirname + '/../_data/' + source + '.json'));
};
