import pino from "pino";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      all: false,
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
      relativeUrl: true,
      lax: false,
    },
  },
});

export { logger };
