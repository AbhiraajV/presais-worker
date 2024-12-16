import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getInsights = async (cont:string): Promise<unknown> => {
   
    const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
        "role": "system",
        "content": [
            {
            "type": "text",
            "text": `
              You are an AI specializing in SaaS market analysis. Analyze the user’s SaaS idea and its competitors using the provided data. Based on your analysis, generate a concise JSON with the following insights:

              Business Existence:

              Provide a mix of positive and negative insights using short statements and actions.
              status shoudl be: Existing, Unique but Existing, Difficult to Stand Against Competition, Untapped Market Potential, Room for Innovation etc...
              Highlight competitors' strengths, weaknesses, and what the user can do to differentiate or improve.
              Keyword Opportunity Insights:

              Identify low-competition, high-relevance keywords and suggest areas to target.
              Market Gap Visualization:

              Highlight opportunities and threats the user can capitalize on.
              Traffic Source Optimization Suggestions:

              Analyze competitor traffic and suggest ways to optimize the user's traffic sources.
              Global and Local Competitor Heatmap:

              Identify regions with competitor strength/weakness, suggesting market expansion opportunities.
              Estimated Market Share Projection:

              Estimate the potential market share considering competitors and market conditions.
              Custom SaaS Performance Score:

              Score the idea (1-10) based on uniqueness, demand, competition, and complexity.
              Ad Budget Recommendations:

              Suggest budget allocations for search and social media ads with focus areas.
              Action: Provide concise, actionable insights based on the analysis, and suggest improvements or alternatives if the idea lacks uniqueness or is in a saturated market.
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
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "enum": ["negative", "positive"]
          },
          "statement": {
            "type": "string"
          },
          "action": {
            "type": "string"
          }
        },
        "required": ["type", "statement", "action"]
      }
    }
  },
  "required": ["status", "description"]
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
                      "required": ["name", "competitionLevel"]
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
                      "required": ["name", "volume", "CPC", "competitionLevel"]
                    }
                  },
                  "conclusion": {
                    "type": "string"
                  }
                },
                "required": ["summary", "recommendedKeywords", "topKeywords", "conclusion"]
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
                "required": ["opportunities", "threats"]
              }
            },
            "required": ["keywordOpportunityInsights", "marketGapVisualization"]
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
                    "required": ["description", "percentage"]
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
                    "required": ["description", "percentage"]
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
                    "required": ["description", "percentage"]
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
                    "required": ["description", "percentage"]
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
                    "required": ["description", "percentage"]
                  }
                },
                "required": ["search", "direct", "social", "referals", "mails"]
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": ["competitorTrends", "recommendation"]
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
                  "required": ["country", "trafficShare", "competitors"]
                }
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": ["dominantCountries", "countryWiseDistribution", "recommendation"]
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
                  "required": ["title", "visits", "marketShare"]
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
                    "required": ["min", "max"]
                  }
                },
                "required": ["description", "range"]
              }
            },
            "required": ["currentCompetitors", "potentialShare"]
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
                "required": ["uniqueness", "marketDemand", "competition", "executionComplexity"]
              },
              "score": {
                "type": "number"
              }
            },
            "required": ["criteria", "score"]
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
                "required": ["budget", "focus"]
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
                "required": ["budget", "focus"]
              }
            },
            "required": ["searchAds", "socialMediaAds"]
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
                "required": ["description", "rate"]
              },
              "recommendation": {
                "type": "string"
              }
            },
            "required": ["totalMarketSize", "monthlyActiveUsers", "growthTrend", "recommendation"]
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
    "required": ["ideaAssessment"],
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