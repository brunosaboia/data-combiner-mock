/* eslint-disable require-jsdoc */

export class Sleeper {
  static sleep(milliseconds: number): Promise<any> {
    console.log(`Stopping executiion flow for ${milliseconds}ms`);
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  static async sleepWithArgs(min: number, max: number): Promise<any> {
    // Generate a random integer between min and max
    const sleepTime = Math.floor(Math.random() * (max - min) + min);

    return this.sleep(sleepTime);
  }
}
