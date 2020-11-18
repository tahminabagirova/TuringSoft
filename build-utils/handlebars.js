const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR_PROJECT = 'src';
const REGEX_HBS = /\.hbs$/;
const HBS_DIR_PAGES = path.join(__dirname, "..", DIR_PROJECT, "templates", "pages")
const HBS_DIR_HELPERS = [
    path.join(__dirname, "..", DIR_PROJECT, "templates", "_helpers"),
    path.join(__dirname, "..", DIR_PROJECT, "templates", "_helpers", "**")
];
const HBS_DIR_PARTIALS = [
    path.join(__dirname, "..", DIR_PROJECT, "templates", "partials"),
    path.join(__dirname, "..", DIR_PROJECT, "templates", "partials", "**")
];

// Helper functions
const hbsPages = fs.readdirSync(HBS_DIR_PAGES)
  .filter(fileName => REGEX_HBS.test(fileName))
  .map(fileName => {
      const tpl = path.join(HBS_DIR_PAGES, fileName); // src/pages/index.hbs
      const html = fileName.replace(REGEX_HBS, '.html'); // index.hbs -> index.html

      return new HtmlWebpackPlugin({
          filename: html,
          template: tpl,
      })
  });


module.exports = {
  content: {
    pages: hbsPages
  },
  vars: {
    pages: HBS_DIR_PAGES,
    helpers: HBS_DIR_HELPERS,
    partials: HBS_DIR_PARTIALS,
  }
};
