# wp-tdt - Wordpress Theme Developer Tools

> Description:  
> This tool came to standardize the WordPress template development process and all without compromising the freedom of the programmer.

## How to use this tool
1. Clone this repository
2. change the project folder name to desired theme name
3. install all npm packages with npm install
4. link the cli to npm with `npm link`

## Create new config file
To start with new theme use `tdt init` and follow the instructions of cli

> this process will create a new tdt.config.json file

Set the theme support use `tdt support` and follow the instructions

> this process will set the new data and minify the final json config file.

### The basic theme is ready to be generated
after creating tdt.config.json you can start with generating the basic files of the theme <br>
`tdt generate`


# Now you can start working on the theme
For compiling the files please run `npm run watch` this will start a gulpfile that will watch the scss and js files.






TODO
* cli to create new widget
* cli to create new sidebar
* cli to create new archive: post name
* cli to create new single post: post name
