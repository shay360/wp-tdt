const chalk = require('chalk');

class Write {
	static successln(message) {
		process.stdout.write(chalk.green(message + '\n'));
	}

	static errorln(message) {
		process.stdout.write(chalk.red(message + '\n'));
	}

	static infoln(message) {
		process.stdout.write(chalk.cyan(message + '\n'));
	}

	static warningln(message) {
		process.stdout.write(chalk.bgRedBright(message + '\n'));
	}
}

exports.Write = Write;
