/* eslint-disable require-jsdoc */

export class Sleeper {
  static sleep(milliseconds: number): Promise<any> {
    console.log(`Stopping execution flow for ${milliseconds}ms`);

    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  static async sleepWithArgs(min: number, max: number): Promise<any> {
    console.log(`Received sleep request with args (min: ${min}, max ${max})`);
    const sleepTime = Math.floor(Math.random() * (max - min) + min);

    return this.sleep(sleepTime);
  }
}
