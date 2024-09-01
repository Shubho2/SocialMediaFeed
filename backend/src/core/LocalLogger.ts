import { createLogger, transports, format, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

export default class LocalLogger {

    static DIRECTORY = path.join(__dirname, '../../logs');

    static #logger: Logger;
    
    static getLogger(): Logger {
        if (!LocalLogger.#logger) {
            LocalLogger.#logger = LocalLogger.#configure();
        }
        return LocalLogger.#logger;
    }

    static getLogLevel(): string | undefined {
        return LocalLogger.#logger.transports[0].level;
    }

    static setLogLevel(level: string): void {
        LocalLogger.#logger.transports[0].level = level;
        LocalLogger.#logger.transports[1].level = level;
    }
    
    static #configure(): Logger {
        LocalLogger.#createDirectory();

        const dailyRotateFile = LocalLogger.#rotateFileConfig();

        return createLogger({
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.errors({ stack: true }),
                        format.timestamp(),
                        format.json(),
                    ),
                }),
                dailyRotateFile,
            ],
        });
    }

    static #rotateFileConfig(): DailyRotateFile {
        return new DailyRotateFile({
            filename: LocalLogger.DIRECTORY + '/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '10',
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp(),
                format.json(),
            ),
        });
    }

    static #createDirectory(): void {
        if (!fs.existsSync(LocalLogger.DIRECTORY)) {
            fs.mkdirSync(LocalLogger.DIRECTORY);
        }
    }

}