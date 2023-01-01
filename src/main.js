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
exports.__esModule = true;
exports.scrapeJobs = void 0;
var puppeteer_1 = require("puppeteer");
function scrapeJobs(url) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, extractJobs, nextButtonSelector, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1["default"].launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 14, 15, 17]);
                    // Navigate to the given URL
                    return [4 /*yield*/, page.goto(url)];
                case 4:
                    // Navigate to the given URL
                    _a.sent();
                    extractJobs = function () { return __awaiter(_this, void 0, void 0, function () {
                        var jobs, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 7, , 8]);
                                    jobs = void 0;
                                    return [4 /*yield*/, page.$('.job-listing')];
                                case 1:
                                    if (!_a.sent()) return [3 /*break*/, 3];
                                    return [4 /*yield*/, page.evaluate(function () {
                                            var jobElements = document.querySelectorAll('.job-listing');
                                            return Array.from(jobElements).map(function (element) {
                                                var titleElement = element.querySelector('.job-title');
                                                var title = titleElement ? titleElement.textContent : '';
                                                var applicationLinkElement = element.querySelector('.apply-button');
                                                var applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
                                                return { title: title, applicationLink: applicationLink };
                                            });
                                        })];
                                case 2:
                                    // Extract the job information from a page with the expected structure
                                    jobs = _a.sent();
                                    return [3 /*break*/, 6];
                                case 3: return [4 /*yield*/, page.$('.job')];
                                case 4:
                                    if (!_a.sent()) return [3 /*break*/, 6];
                                    return [4 /*yield*/, page.evaluate(function () {
                                            var jobElements = document.querySelectorAll('.position');
                                            return Array.from(jobElements).map(function (element) {
                                                var titleElement = element.querySelector('.title');
                                                var title = titleElement ? titleElement.textContent : '';
                                                var applicationLinkElement = element.querySelector('.apply-button');
                                                var applicationLink = applicationLinkElement ? applicationLinkElement.getAttribute('href') : '';
                                                return { title: title, applicationLink: applicationLink };
                                            });
                                        })];
                                case 5:
                                    // Extract the job information from a page with a different structure
                                    jobs = _a.sent();
                                    _a.label = 6;
                                case 6:
                                    // Log the job information to the console
                                    console.log(jobs);
                                    return [3 /*break*/, 8];
                                case 7:
                                    error_2 = _a.sent();
                                    // Log the error to the console
                                    console.error(error_2);
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); };
                    // Extract the job information from the current page
                    return [4 /*yield*/, extractJobs()];
                case 5:
                    // Extract the job information from the current page
                    _a.sent();
                    nextButtonSelector = '.pagination-next';
                    return [4 /*yield*/, page.$(nextButtonSelector)];
                case 6:
                    if (!_a.sent()) return [3 /*break*/, 10];
                    // Click the "next" button
                    return [4 /*yield*/, page.click(nextButtonSelector)];
                case 7:
                    // Click the "next" button
                    _a.sent();
                    // Wait for the page to load
                    return [4 /*yield*/, page.waitForNavigation()];
                case 8:
                    // Wait for the page to load
                    _a.sent();
                    // Extract the job information from the next page
                    return [4 /*yield*/, extractJobs()];
                case 9:
                    // Extract the job information from the next page
                    _a.sent();
                    return [3 /*break*/, 12];
                case 10: 
                // Close the browser
                return [4 /*yield*/, browser.close()];
                case 11:
                    // Close the browser
                    _a.sent();
                    _a.label = 12;
                case 12: 
                // Extract the job information from the current page
                return [4 /*yield*/, extractJobs()];
                case 13:
                    // Extract the job information from the current page
                    _a.sent();
                    return [3 /*break*/, 17];
                case 14:
                    error_1 = _a.sent();
                    // Log the error to the console
                    console.error(error_1);
                    return [3 /*break*/, 17];
                case 15: 
                // Close the browser
                return [4 /*yield*/, browser.close()];
                case 16:
                    // Close the browser
                    _a.sent();
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.scrapeJobs = scrapeJobs;
;
// Scrape the jobs from the given URL
scrapeJobs('https://www.example.com/jobs');
