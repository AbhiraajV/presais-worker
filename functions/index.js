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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const analysis_api_1 = require("./analysis.api");
const findcomp_ai_1 = require("./findcomp.ai");
const prisma_functions_1 = require("./prisma.functions");
const resend_1 = require("./resend");
const main = (prompt, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const competitionsList = yield (0, findcomp_ai_1.findCompetition)(prompt);
    const saasDomains = competitionsList.Competitors.map(c => c.Domain);
    const analysis = yield (0, analysis_api_1.totalAnalysis)(saasDomains);
    const writeToDb = yield (0, prisma_functions_1.writeDataToReport)({ competitionsList, analysis }, prompt, userId);
    yield (0, resend_1.sendMail)(userId, writeToDb.id);
    return writeToDb;
});
exports.main = main;
