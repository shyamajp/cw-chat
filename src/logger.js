const log4js = require("log4js");

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
    all_file: { type: "file", filename: "logs/all.log" },
    error_file: { type: "file", filename: "logs/error.log" },
    logLevelFilter: {
      type: "logLevelFilter",
      level: "debug",
      appender: "all_file",
    },
    logLevelFilter: {
      type: "logLevelFilter",
      level: "error",
      appender: "error_file",
    },
  },
  categories: {
    default: {
      appenders: ["logLevelFilter", "stdout"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger();

exports.logger = logger;
