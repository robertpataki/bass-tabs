<p align="center">
  <a href="http://robertpataki.github.io/os-bass-tabs/">
    <img width="144" height="144" src="http://robertpataki.github.io/os-bass-tabs/apple-touch-icon.png"/>
  </a>
</p>

# OS Bass Tabs

## Project Live URL
[http://robertpataki.github.io/os-bass-tabs/](http://robertpataki.github.io/os-bass-tabs/)

## Project requirements

The project uses the [`generator-sizzle`](https://github.com/robertpataki/generator-sizzle) Yeoman generator as a scaffolding tool, and it uses the Grunt Jekyll module to generate the static HTML pages and tabs (which are essentially posts). There is a very sweet mixture of NPM and Ruby going on here :)

To be able to run the project you will need to have

[`npm`](http://nodejs.org/download/), [`grunt-cli`](http://gruntjs.com/getting-started), [`bower`](http://bower.io/); [`ruby`](https://www.ruby-lang.org/en/), [`compass`](http://compass-style.org/), [`jekyll`](http://jekyllrb.com/), and [`bundler`](http://bundler.io/)` installed.

### Setting up the project locally

Once you have all the above installed, you can set up the project locally by running:

	$ npm install
	$ bower install
	$ bundle

Once you're all set, you can test the project locally by running:

	$ grunt serve

### Deploying

The project is hosted on Github Pages, so the most up to date, stable version should be pushed to the `gh-pages` branch.

## Contributions

### Creating a new bass tab

**Running the following grunt task in your command line:**

	$ grunt create_tabs --name "The Doors - Break On Through (To The Other Side)
	
will generate a new static HTML page with a details already added to the page's meta data - The title of the song, the artist, and the page title of course.

Apart from a badass bass tab, there a few more details you should add to your file, here is a checklist:

	album:        "The name of the album"
	year:         "The year the song was released"
	author:       "Your name"
	author_email: "Your email address" (optional)
	author_site:  "Your website" (optional)
	tuning:       "GDAE"
	youtube:      "Full URL of the Youtube video for the song"
	
These details become very handy, and will sweeten the overall user experience!

[Check out an example](http://robertpataki.github.io/os-bass-tabs/tabs/bonobo_dismantling-frank.html) to see how a bass tab looks like on the site!

### Issues and bug fixing

Please use [Github Issues](https://github.com/robertpataki/os-bass-tabs/issues) to let me know about bugs and issues you experience on the website.

### Pull requests

Please use Github to add your awesome tabs and code improvements using [pull requests](https://github.com/robertpataki/os-bass-tabs/pulls).

## Licence

The project was released under the [MIT Licence](http://opensource.org/licenses/MIT).

Copyright (C) 2015 Rob Pataki, [http://robertpataki.com](http://robertpataki.com)