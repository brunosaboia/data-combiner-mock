/* eslint-disable require-jsdoc */
import md5File from 'md5-file';
import fs from 'fs';
/**
 * Common lib with shared functions for Data Combiner
 */
export class DataLoader {
    dataFilePath: string;
    latestMd5: string;
    latestFileSize: number;
    data: Array<any>;

    /**
     * @param {string} dataFilePath
     */
    constructor(dataFilePath: string) {
      this.dataFilePath = dataFilePath;
      this.latestFileSize = 0;
      this.latestMd5 = '';
    };

    async isLatestMd5(): Promise<boolean> {
      const currentMd5 = await md5File(this.dataFilePath);

      if (this.latestMd5 === '') {
        console.log('MD5 was never checked. Setting it and skipping...');

        this.latestMd5 = currentMd5;

        return false;
      }

      const isCurrentMd5 = currentMd5 === this.latestMd5;

      this.latestMd5 = currentMd5;

      return isCurrentMd5;
    };

    async isDataCurrent(): Promise<boolean> {
      const stats = fs.statSync(this.dataFilePath);
      const currentFileSize = stats['size'];

      if (this.latestFileSize === 0) {
        const msg = 'Checking for the first time. ' +
          `File has ${currentFileSize} bytes`;
        console.log(msg);
        this.latestFileSize = currentFileSize;

        return false;
      }
      const isCurrentFileSize = currentFileSize === this.latestFileSize;

      if (isCurrentFileSize) {
        console.log('File size has not changed. Checking MD5');

        return await this.isLatestMd5();
      }
      this.latestFileSize = currentFileSize;

      return false;
    };

    readJsonData(): Array<any> {
      try {
        const data = fs.readFileSync(this.dataFilePath, 'utf-8');

        return JSON.parse(data);
      } catch (err) {
        const errMsg = `Error reading data: ${err}. ` +
        'Array will be empty.';
        console.log(errMsg);

        return [];
      }
    };

    async loadMostUpToDateData(): Promise<void> {
      if (await this.isDataCurrent()) {
        console.log('Data is up to date. Skipping loading');

        return;
      }
      console.log('Loading most recent data');
      this.data = this.readJsonData();
      console.log(`Loaded ${this.data.length} items in memory`);
    };

    sleep(milliseconds: number): Promise<any> {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    generateRandomInteger(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    };

    async sleepWithArgs(args: { min: number; max: number; }): Promise<void> {
      const min = args.min || 3000;
      const max = args.max || 10000;

      const sleepTime = this.generateRandomInteger(min, max);
      console.log(`Sleeping for ${sleepTime} before continuing flow`);

      await this.sleep(sleepTime);
    };
};
