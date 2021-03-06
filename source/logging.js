const winston = require('winston')
const { combine, timestamp, prettyPrint, json } = winston.format

const formatting = [json(), timestamp()]
if (process.env.LOG_PRETTY_PRINT)
	formatting.push(prettyPrint())

const logger = new winston.createLogger({
	level: (process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'info',
	format: combine(...formatting),
	defaultMeta: { service: 'post-service' },
	transports: [
		new winston.transports.Console()
	],
	exceptionHandlers: [
		new winston.transports.Console()
	]
})

module.exports = logger
