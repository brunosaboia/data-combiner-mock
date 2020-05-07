"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-jsdoc */
var md5_file_1 = __importDefault(require("md5-file"));
var fs_1 = __importDefault(require("fs"));
/**
 * Common lib with shared functions for Data Combiner
 */
var DataLoader = /** @class */ (function () {
    /**
     * @param {string} dataFilePath
     */
    function DataLoader(dataFilePath) {
        this.dataFilePath = dataFilePath;
        this.latestFileSize = 0;
        this.latestMd5 = '';
    }
    ;
    DataLoader.prototype.isLatestMd5 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentMd5, isCurrentMd5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, md5_file_1.default(this.dataFilePath)];
                    case 1:
                        currentMd5 = _a.sent();
                        if (this.latestMd5 === '') {
                            console.log('MD5 was never checked. Setting it and skipping...');
                            this.latestMd5 = currentMd5;
                            return [2 /*return*/, true];
                        }
                        isCurrentMd5 = currentMd5 === this.latestMd5;
                        this.latestMd5 = currentMd5;
                        return [2 /*return*/, isCurrentMd5];
                }
            });
        });
    };
    ;
    DataLoader.prototype.isDataCurrent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, currentFileSize, msg, isCurrentFileSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stats = fs_1.default.statSync(this.dataFilePath);
                        currentFileSize = stats['size'];
                        if (this.latestFileSize === 0) {
                            msg = 'Checking for the first time. ' +
                                ("File has " + currentFileSize + " bytes");
                            console.log(msg);
                            this.latestFileSize = currentFileSize;
                            return [2 /*return*/, false];
                        }
                        isCurrentFileSize = currentFileSize === this.latestFileSize;
                        if (!isCurrentFileSize) return [3 /*break*/, 2];
                        console.log('File size has not changed. Checking MD5');
                        return [4 /*yield*/, this.isLatestMd5()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        this.latestFileSize = currentFileSize;
                        return [2 /*return*/, false];
                }
            });
        });
    };
    ;
    DataLoader.prototype.readJsonData = function () {
        try {
            var data = fs_1.default.readFileSync(this.dataFilePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (err) {
            var errMsg = "Error reading data: " + err + ". " +
                'Array will be empty.';
            console.log(errMsg);
            return [];
        }
    };
    ;
    DataLoader.prototype.loadMostUpToDateData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isDataCurrent()];
                    case 1:
                        if (_a.sent()) {
                            console.log('Data is up to date. Skipping loading');
                            return [2 /*return*/];
                        }
                        console.log('Loading most recent data');
                        this.data = this.readJsonData();
                        console.log("Loaded " + this.data.length + " items in memory");
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    DataLoader.prototype.sleep = function (milliseconds) {
        return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
    };
    ;
    DataLoader.prototype.generateRandomInteger = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    ;
    DataLoader.prototype.sleepWithArgs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var min, max, sleepTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        min = args.min || 3000;
                        max = args.max || 10000;
                        sleepTime = this.generateRandomInteger(min, max);
                        console.log("Sleeping for " + sleepTime + " before continuing flow");
                        return [4 /*yield*/, this.sleep(sleepTime)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return DataLoader;
}());
exports.DataLoader = DataLoader;
;
//# sourceMappingURL=data-loader.js.map