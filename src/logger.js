const log4js = require("log4js");

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
    all_file: { type: "file", filename: "logs/all-logs.log" },
    error_file: { type: "file", filename: "logs/error-logs.log" },
    debug_filter: {
      type: "logLevelFilter",
      level: "debug",
      appender: "all_file",
    },
    error_filter: {
      type: "logLevelFilter",
      level: "error",
      appender: "error_file",
    },
  },
  categories: {
    default: {
      appenders: ["debug_filter", "error_filter", "stdout"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger();

exports.logger = logger;
