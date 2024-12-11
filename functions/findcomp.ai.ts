import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
type Competitor = {
  Name: string; // Competitor Name
  Description: string; // Brief business description of the competitor
  Domain: string; // Website domain of the competitor
};

type CompetitorsSchema = {
  Competitors: Competitor[]; // A list of competitors
};

export const findCompetition = async (saasDescription:string): Promise<CompetitorsSchema> => {
    const response = await openai.chat.completions.create({
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
                        role:"user",
                        content:saasDescription
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

    return JSON.parse(response.choices[0].message.content!) as unknown as CompetitorsSchema
}