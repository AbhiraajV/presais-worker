import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getInsights = async (cont:string): Promise<unknown> => {
   
    const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
        "role": "system",
        "content": [
            {
            "type": "text",
            "text": `You are an advanced AI specialized in SaaS market analysis and competitor insights. Your task is to analyze the data provided by a user regarding their SaaS idea and its competitors. Based on this analysis, you will output a JSON object adhering to the specified data structure. Follow these instructions carefully:
            
                Understand the User's SaaS Idea:

Extract the key value proposition, unique features, and primary target audience of the user's SaaS idea from the input data.
Identify whether the SaaS idea is entirely novel, has a unique twist on an existing business, or is an improvement of an existing concept.
Analyze Competitor Data:

Evaluate the competitors provided in terms of market share, user traffic, and any other relevant KPIs shared by the user.
Identify gaps or opportunities in the market that the user's SaaS idea can leverage.
Generate Insights:
Based on the analysis, populate the following fields in the JSON structure:

Keyword Opportunity Insights: Provide insights on keywords relevant to the user's SaaS, identifying opportunities where competition is low and relevance is high. Suggest recommended keywords with their competition level.
Market Gap Visualization: Highlight opportunities the user's SaaS can exploit and threats they need to mitigate.
Traffic Source Optimization Suggestions: Analyze traffic patterns of competitors and recommend strategies for the user's SaaS to optimize its traffic sources.
Global and Local Competitor Heatmap: Identify regions or countries where the user can expand based on competitor performance and market gaps.
Estimated Market Share Projection: Provide an analysis of potential market share for the user's SaaS, considering competitors and market conditions.
Custom SaaS Performance Score: Evaluate the SaaS idea on uniqueness, market demand, competition, and execution complexity to calculate a performance score out of 10.
Ad Budget Recommendations: Suggest budget allocations and areas of focus for both search and social media ads.
            `
            }
        ]
        },
        {
            'role':"user",
            'content':cont,
        }
    ],
    response_format: {
        "type": "json_schema",
        "json_schema": {
        "name": "ideaAssessment",
        "strict": true,
       
        "schema": {
    "type": "object",
    "properties": {
      "ideaAssessment": {
        "type": "object",
        "properties": {
          "businessExistence": {
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "enum": [
                  "unique_twist",
                  "exists",
                  "not_exists"
                ]
              },
              "description": {
                "type": "string"
              }
            },
            "required": [
              "status",
              "description"
            ],
            "additionalProperties": false
          },
          "competitorAnalysis": {
            "type": "object",
            "properties": {
              "keywordOpportunityInsights": {
                "type": "object",
                "properties": {
                  "summary": {
                    "type": "string"
                  },
                  "recommendedKeywords": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "competitionLevel": {
                          "type": "string",
                          "enum": [
                            "Low",
                            "Medium",
                            "High"
                          ]
                        }
                      },
                      "required": [
                        "name",
                        "competitionLevel"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "topKeywords": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "volume": {
                          "type": "number"
                        },
                        "CPC": {
                          "type": "number"
                        },
                        "competitionLevel": {
                          "type": "string",
                          "enum": [
                            "Low",
                            "Medium",
                            "High"
                          ]
                        }
                      },
                      "required": [
                        "name",
                        "volume",
                        "CPC",
                        "competitionLevel"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "conclusion": {
                    "type": "string"
                  }
                },
                "required": [
                  "summary",
                  "recommendedKeywords",
                  "topKeywords",
                  "conclusion"
                ],
                "additionalProperties": false
              },
              "marketGapVisualization": {
                "type": "object",
                "properties": {
                  "opportunities": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "threats": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": [
                  "opportunities",
                  "threats"
                ],
                "additionalProperties": false
              }
            },
            "required": [
              "keywordOpportunityInsights",
              "marketGapVisualization"
            ],
            "additionalProperties": false
          },
          "trafficSourceOptimizationSuggestions": {
            "type": "object",
            "properties": {
              "competitorTrends": {
                "type": "object",
                "properties": {
                  "search": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "string"
                      },
                      "percentage": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "description",
                      "percentage"
                    ],
                    "additionalProperties": false
                  },
                  "direct": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "type": "string"
                      },
                      "percentage": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "description",
                      "percentage"
                    ],
                    "additionalProperties": false
                  }
                },
                "required": [
                  "search",
                  "direct"
                ],
                "additionalProperties": false
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": [
              "competitorTrends",
              "recommendation"
            ],
            "additionalProperties": false
          },
          "globalAndLocalCompetitorHeatmap": {
            "type": "object",
            "properties": {
              "dominantCountries": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": [
              "dominantCountries",
              "recommendation"
            ],
            "additionalProperties": false
          },
          "estimatedMarketShareProjection": {
            "type": "object",
            "properties": {
              "currentCompetitors": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "visits": {
                      "type": "number"
                    },
                    "marketShare": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "title",
                    "visits",
                    "marketShare"
                  ],
                  "additionalProperties": false
                }
              },
              "potentialShare": {
                "type": "object",
                "properties": {
                  "description": {
                    "type": "string"
                  },
                  "range": {
                    "type": "object",
                    "properties": {
                      "min": {
                        "type": "number"
                      },
                      "max": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "min",
                      "max"
                    ],
                    "additionalProperties": false
                  }
                },
                "required": [
                  "description",
                  "range"
                ],
                "additionalProperties": false
              }
            },
            "required": [
              "currentCompetitors",
              "potentialShare"
            ],
            "additionalProperties": false
          },
          "customSaaSPerformanceScore": {
            "type": "object",
            "properties": {
              "criteria": {
                "type": "object",
                "properties": {
                  "uniqueness": {
                    "type": "number"
                  },
                  "marketDemand": {
                    "type": "number"
                  },
                  "competition": {
                    "type": "number"
                  },
                  "executionComplexity": {
                    "type": "number"
                  }
                },
                "required": [
                  "uniqueness",
                  "marketDemand",
                  "competition",
                  "executionComplexity"
                ],
                "additionalProperties": false
              },
              "score": {
                "type": "number"
              }
            },
            "required": [
              "criteria",
              "score"
            ],
            "additionalProperties": false
          },
          "adBudgetRecommendations": {
            "type": "object",
            "properties": {
              "searchAds": {
                "type": "object",
                "properties": {
                  "budget": {
                    "type": "string"
                  },
                  "focus": {
                    "type": "string"
                  }
                },
                "required": [
                  "budget",
                  "focus"
                ],
                "additionalProperties": false
              },
              "socialMediaAds": {
                "type": "object",
                "properties": {
                  "budget": {
                    "type": "string"
                  },
                  "focus": {
                    "type": "string"
                  }
                },
                "required": [
                  "budget",
                  "focus"
                ],
                "additionalProperties": false
              }
            },
            "required": [
              "searchAds",
              "socialMediaAds"
            ],
            "additionalProperties": false
          }
        },
        "required": [
          "businessExistence",
          "competitorAnalysis",
          "trafficSourceOptimizationSuggestions",
          "globalAndLocalCompetitorHeatmap",
          "estimatedMarketShareProjection",
          "customSaaSPerformanceScore",
          "adBudgetRecommendations"
        ],
        "additionalProperties": false
      }
    },
    "required": [
      "ideaAssessment"
    ],
    "additionalProperties": false
  },
        }
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
    });
    console.log({p:response.usage?.prompt_tokens,q:response.usage?.completion_tokens,r:response.usage?.total_tokens})
    return JSON.parse(response.choices[0].message.content!) as unknown;
}