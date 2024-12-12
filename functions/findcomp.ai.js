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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCompetition = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const findCompetition = (saasDescription) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "User will describe their saas, and how many competitors they are looking for. You must respond only in JSON format an array of n number of competitors currently in market in order of popularity.\nThis is the format for the output\n"
                    }
                ]
            },
            {
                role: "user",
                content: saasDescription
            }
        ],
        response_format: {
            "type": "json_schema",
            "json_schema": {
                "name": "competitors_schema",
                "strict": true,
                "schema": {
                    "type": "object",
                    "properties": {
                        "Competitors": {
                            "type": "array",
                            "description": "A list of competitors.",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "Name": {
                                        "type": "string",
                                        "description": "Competitor Name."
                                    },
                                    "Description": {
                                        "type": "string",
                                        "description": "Brief business description of the competitor."
                                    },
                                    "Domain": {
                                        "type": "string",
                                        "description": "Website domain of the competitor."
                                    }
                                },
                                "required": [
                                    "Name",
                                    "Description",
                                    "Domain"
                                ],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": [
                        "Competitors"
                    ],
                    "additionalProperties": false
                }
            }
        },
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return JSON.parse(response.choices[0].message.content);
});
exports.findCompetition = findCompetition;
