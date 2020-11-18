# Repo Read Me

Read before starting to use the boilerplate. This boilerplate uses `webpack` to compile.

### Setup

To user project, you have to install dependencies first

```sh
$ npm install
```

### Development mode ###

To start development mode, you should run the command below

```sh
$ npm start
```

### Production build ###

To start development mode, you should run the command below

```sh
$ npm run build
```

on Windows

```sh
$ npm run build-windows
```

---

## Structure ##

Project includes:

- jQuery
- Bootstrap 4
- Font Awesome
- and uses ES6 syntax



```bash

root
  |–– src
      |–– js
          |–– vendors
          |–– app.js # main entry point for javascript
      |–– static
          |–– assets
      |–– styles
          |–– fonts
          |–– icons # icons for css image sprite
          |–– vendors
          |–– main.scss # main entry point for css
          |–– sprite.scss # DO NOT CHANGE: auto-generated for image sprite
      |–– templates
          |–– _data # data folder to use in .hbs files
          |–– _helpers
          |–– pages # folder that contains .hbs files that will be converted to .html files
          |–– partials # partials to include in `pages` folder
              |–– common

```

### Image Sprite

For image sprite this boilerplate uses: [webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith). It's automatically generates `src/static/assets/sprite.png` file from the `.png` images that located in `src/static/icons`.

*** Example usage: ***

to use `src/styles/icons/hello.png` as a sprite icon:

__ CSS: __

```scss
.icon {
  display: inline-block;

  &-hello {
    @include sprite($hello);
  }
}
```

__ HTML: __

```html
<span class="icon icon-hello"></span>
```
