# wp-tdt - Wordpress Theme Developer Tools
> This tool came to standardize the WordPress template development process and all without compromising the freedom of the programmer.

To start using tdt, open your bash inside the wp-content/themes directory.

## Installing tdt
1. Clone this repository to wp-content/themes directory
2. change the project folder name to desired theme name
3. install all npm packages with npm install
4. link the cli to npm with `npm link`

### CLI commands
all the commands starts with tdt for example, if i would like to see the help of the tool i will use:<br>
```tdt -h``` or ```tdt --help```<br>

List of commands (with description)
1. init - Set the basic details of your theme include, theme name, author, URI etc...
2. support - Set the basic theme support.
> this process will create a new tdt.config.json file
3. generate - will generate the basic files of your theme, after this stage you can install your new theme in wordpress, it uses the tdt.config.json file and this file must be existing
>Now you can start working on the theme<br>
For compiling the files please run `npm run watch` this will start a gulpfile that will watch the scss and js files.
4. create - this command will let you create assets for your theme like template files, widgets, sidebars etc...


TODO
* cli to create new archive: post name
* cli to create new single post: post name
