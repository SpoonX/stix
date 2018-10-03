import Table from 'cli-table';
import prettyjson from 'prettyjson';
import PrettyError from 'pretty-error';

export class Output {
  private exitCode: number = 0;

  private data: any[] = [];

  private prettyError: PrettyError = new PrettyError();

  public static create () {
    return new this();
  }

  public static errorOutput (error?: string | Error, exitCode?: number) {
    const output = new this();

    output.error(error, exitCode);

    return output;
  }

  /**
   * Exit code to use upon send.
   *
   *  NOTE: Exit codes 1 - 2, 126 - 165, and 255 have special meanings
   *        and should therefore be avoided for user-specified exit parameters.
   *        Try restricting user-defined exit codes to the range 64 - 113 (in addition to 0, for success).
   *
   * 1 - Catchall for general errors
   * 2 - Misuse of shell builtins (according to Bash documentation)
   * 126 - Command invoked cannot execute
   * 127 - “command not found”
   * 128 - Invalid argument to exit
   * 128+n - Fatal error signal “n”
   * 130 - Script terminated by Control-C
   * 255\* - Exit status out of range
   *
   * @see http://tldp.org/LDP/abs/html/exitcodes.html
   *
   * @param {Number} exitCode
   *
   * @return {this}
   */
  public setExitCode (exitCode: number): this {
    this.exitCode = exitCode;

    return this;
  }

  public addData (data: any): this {
    if (data.constructor === Object) {
      return this.addData(prettyjson.render(data));
    }

    this.data.push(data);

    return this;
  }

  public resetData (): this {
    this.data = [];

    return this;
  }

  public addHorizontalTable (head: string[], data: Array<string>[], options: any = {}): this {
    const table = new Table({ head, ...options });

    table.push(...data);

    this.addData(table.toString());

    return this;
  }

  public addVerticalTable (data: {[key: string]: string}[], options?: any): this {
    const table = new Table(options);

    table.push(...data);

    this.addData(table);

    return this;
  }

  public addCrossTable (head: string[], data: {[key: string]: string[]}[], options: any = {}):this {
    const table = new Table(options);

    table.push(...data);

    this.addData(table);

    return this;
  }

  /**
   * Add/set an error to output.
   *
   * @param {Error|string}  [error]     The error to write.         Default to "Unknown error".
   * @param {Number|null}   [exitCode]  The code to exit with.      Default to 1. Use null to not change the exitCode.
   * @param {boolean}       [clear]     Clear previously set data.  Default to false.
   *
   * @return {this}
   */
  public error (error: Error | string = 'Unknown error', exitCode: number = 1, clear: boolean = false): this {
    if (!this.prettyError) {
      this.prettyError = new PrettyError();
    }

    if (exitCode) {
      this.setExitCode(exitCode);
    }

    if (clear) {
      this.resetData();
    }

    this.addData(this.prettyError.render(error));

    return this;
  }

  /**
   * Write the output to the console.
   */
  public flush () {
    this.data.forEach((piece: any) => console.log(piece));
  }

  public send () {
    this.flush();

    process.exit(this.exitCode);
  }
}
