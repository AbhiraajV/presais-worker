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
You must understand the users data very carefully before analysing everything, give usefull suggestions on what they can do to their buissness to capture the untapped market that you understand from the given data!
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
        "additionalProperties": false,
        "properties": {
          "businessExistence": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "status": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            },
            "required": [
              "status",
              "description"
            ]
          },
          "competitorAnalysis": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "keywordOpportunityInsights": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "summary": {
                    "type": "string"
                  },
                  "recommendedKeywords": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "competitionLevel": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "competitionLevel"
                      ]
                    }
                  },
                  "topKeywords": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "additionalProperties": false,
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
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "volume",
                        "CPC",
                        "competitionLevel"
                      ]
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
                ]
              },
              "marketGapVisualization": {
                "type": "object",
                "additionalProperties": false,
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
                ]
              }
            },
            "required": [
              "keywordOpportunityInsights",
              "marketGapVisualization"
            ]
          },
          "trafficSourceOptimizationSuggestions": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "competitorTrends": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "search": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  },
                  "direct": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  },
                  "social": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  },
                  "referals": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  },
                  "mails": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  }
                },
                "required": [
                  "search",
                  "direct",
                  "social",
                  "referals",
                  "mails"
                ]
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": [
              "competitorTrends",
              "recommendation"
            ]
          },
          "globalAndLocalCompetitorHeatmap": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "dominantCountries": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "countryWiseDistribution": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "country": {
                      "type": "string"
                    },
                    "trafficShare": {
                      "type": "number"
                    },
                    "competitors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  },
                  "required": [
                    "country",
                    "trafficShare",
                    "competitors"
                  ]
                }
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": [
              "dominantCountries",
              "countryWiseDistribution",
              "recommendation"
            ]
          },
          "estimatedMarketShareProjection": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "currentCompetitors": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
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
                  ]
                }
              },
              "potentialShare": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "description": {
                    "type": "string"
                  },
                  "range": {
                    "type": "object",
                    "additionalProperties": false,
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
                    ]
                  }
                },
                "required": [
                  "description",
                  "range"
                ]
              }
            },
            "required": [
              "currentCompetitors",
              "potentialShare"
            ]
          },
          "customSaaSPerformanceScore": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "criteria": {
                "type": "object",
                "additionalProperties": false,
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
                ]
              },
              "score": {
                "type": "number"
              }
            },
            "required": [
              "criteria",
              "score"
            ]
          },
          "adBudgetRecommendations": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "searchAds": {
                "type": "object",
                "additionalProperties": false,
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
                ]
              },
              "socialMediaAds": {
                "type": "object",
                "additionalProperties": false,
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
                ]
              }
            },
            "required": [
              "searchAds",
              "socialMediaAds"
            ]
          },
          "marketSizeAnalysis": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "totalMarketSize": {
                "type": "number"
              },
              "monthlyActiveUsers": {
                "type": "number"
              },
              "growthTrend": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "description": {
                    "type": "string"
                  },
                  "rate": {
                    "type": "number"
                  }
                },
                "required": [
                  "description",
                  "rate"
                ]
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": [
              "totalMarketSize",
              "monthlyActiveUsers",
              "growthTrend",
              "recommendation"
            ]
          }
        },
        "required": [
          "businessExistence",
          "competitorAnalysis",
          "trafficSourceOptimizationSuggestions",
          "globalAndLocalCompetitorHeatmap",
          "estimatedMarketShareProjection",
          "customSaaSPerformanceScore",
          "adBudgetRecommendations",
          "marketSizeAnalysis"
        ]
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