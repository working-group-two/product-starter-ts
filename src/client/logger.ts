type LogLevel = 'WARN' | 'INFO' | 'DEBUG'

class Logger {
    private readonly currentLogLevel: LogLevel;

    constructor(logLevel: LogLevel) {
        this.currentLogLevel = logLevel;
    }

    debug(...messages: any[]) {
        this.print('INFO', ...messages);
    }

    info(...messages: any[]) {
        this.print('INFO', ...messages);
    }

    warn(...messages: any[]) {
        this.print('WARN', ...messages);
    }

    private print(level: string, ...messages: any[]) {
        console.log(`[${new Date().toISOString()}] [${level}]`, ...messages);
    }

    private shouldLog(level: LogLevel): boolean {
        const logLevels = ['WARN', 'INFO', 'DEBUG'];
        return logLevels.indexOf(level) <= logLevels.indexOf(this.currentLogLevel);
    }
}

export const LOG = new Logger('DEBUG');
