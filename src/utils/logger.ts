import { OutputChannel, window } from 'vscode';
import { ext } from '../extensionVariables';
import { inspect } from 'util';


/**
 * todo:
 *  - add support for extension settings
 *      - timezone?
 *      - log file/external options?
 *      - coloring of logs for different levels
 *          - red for error - yellow for warning - green for confirmation
 * 
 * Sources/Examples/Credit:
 * - https://github.com/microsoft/vscode/issues/59209#issuecomment-424483115
 * 
 * - https://github.com/Huachao/vscode-restclient/blob/master/src/logger.ts
 * 
 * - https://github.com/Strum355/vscode-mc-shader/blob/fa816200275de8b0a89b432a356ac3bb55da919c/client/src/log.ts
 * - https://github.com/Strum355/vscode-mc-shader/blob/fa816200275de8b0a89b432a356ac3bb55da919c/client/src/extension.ts
 * 
 * - https://stackoverflow.com/questions/42631017/new-dateyear-month-date-in-node-js-is-automatically-getting-converted-to-utc
 * 
 */


 /**
  * logger class to log information to OUTPUT console of vscode window
  * prefer to use logger.debug, but feel free to explore others
  * example: logger.debug('chuck-joke->resp.data', resp.data);
  */
export class Log {
    // static debug(arg0: string, arg1: string) {
    //     throw new Error('Method not implemented.');
    // }
    private _outputChannel: OutputChannel | undefined;
    // private readonly _restClientSettings: RestClientSettings = RestClientSettings.Instance;
    private _logLevel = LogLevel.Debug;
    public constructor() {
        // this._outputChannel = window.createOutputChannel('f5-fast');
        this.init();
    }

    private init() {
        // create output channel if not available
        if (!this._outputChannel) {
            this._outputChannel = window.createOutputChannel('f5');
            this._outputChannel.show(true);
        }
    }

    // /**
    //  * verbose logging to OUTPUT
    //  * @param message message string
    //  * @param data 
    //  */
    // public verbose(message: string, data?: any): void {
    //     this.log(LogLevel.Verbose, message, data);
    // }

    // public info(message: string, data?: any): void {
    //     this.log(LogLevel.Info, message, data);
    // }

    // public warn(message: string, data?: any): void {
    //     this.log(LogLevel.Warn, message, data);
    // }

    // public error(message: string, data?: any): void {
    //     this.log(LogLevel.Error, message, data);
    // }

    // public log(level: LogLevel, message: string, data?: any): void {
    //     if (level >= this._logLevel) {
    //         const date = (new Date().toLocaleTimeString());
    //         this._outputChannel.appendLine(`[${date} - ${LogLevel[level]}] ${message}`);
    //         if (data) {
    //             this._outputChannel.appendLine(this.data2String(data));
    //         }
    //     }
    // }

    /**
     * preferred method for logggin at this time
     * @param msg 
     */
    debug(...msg: [unknown, ...unknown[]]): void {
        this.write('DEBUG', ...msg);
    }

    info(...msg: [unknown, ...unknown[]]): void {
        this.write('INFO', ...msg);
    }

    warn(...msg: [unknown, ...unknown[]]): void {
        this.write('WARN', ...msg);
    }

    error(...msg: [unknown, ...unknown[]]): void {
        this.write('ERROR', ...msg);
    }

    write(label: string, ...messageParts: unknown[]): void {
        const message = messageParts.map(this.stringify).join(' ');
        // const dateTime = new Date().toLocaleString();
        // const dateTime = new Date();
        const dateTime = new Date().toISOString();
        if(!this._outputChannel) {
            this.init();
        } else {
            this._outputChannel.appendLine(`[${dateTime}] ${label}: ${message}`);
        }
    }

    // private init(){
    //     const label = 'DeBuG';
    //     // const message = 'very special log message';
    //     const dateTime = new Date();
    //     const dateT1 = dateTime.toISOString();
    //     const dateT2 = dateTime.toLocaleString();
    //     const dateT3 = dateTime.toUTCString();
    //     this._outputChannel.appendLine(`[${dateT1}] ${label}: 'regular date log message'`);
    //     this._outputChannel.appendLine(`[${dateT2}] ${label}: 'toLocalString date log message'`);
    //     this._outputChannel.appendLine(`[${dateT3}] ${label}: 'to UTC date log message'`);
    // }

    

    private stringify(val: unknown): string {
        if (typeof val === 'string') { return val; }
        return inspect(val, {
            colors: false,
            depth: 6, // heuristic
        });
    }

    // private data2String(data: any): string {
    //     if (data instanceof Error) {
    //         return data.stack || data.message;
    //     }

    //     if (typeof data === 'string') {
    //         return data;
    //     }

    //     return JSON.stringify(data, null, 2);
    //     // return data;
    // }
}


export enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
}

// function fromString(value: string): LogLevel {
//     value = value.toLowerCase();
//     switch (value) {
//         case 'debug':
//             return LogLevel.Debug;
//         case 'info':
//             return LogLevel.Info;
//         case 'warn':
//             return LogLevel.Warn;
//         case 'error':
//         default:
//             return LogLevel.Error;
//     }
// }

const logger = new Log();
export default logger;