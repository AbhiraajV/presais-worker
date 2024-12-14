import axios from 'axios';

const apiKey = process.env.SIMWEB_API_KEY;

// Existing API calls
export const getSimilarSites = async (domain: string): Promise<any> => {
  const options = {
    method: 'GET',
    url: 'https://similar-web.p.rapidapi.com/get-similar-sites',
    params: { domain },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'similar-web.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar sites for domain ${domain}:`, error);
    throw error;
  }
};

export const getAnalytics = async (domain: string): Promise<any> => {
  const options = {
    method: 'GET',
    url: 'https://similar-web.p.rapidapi.com/get-analysis',
    params: { domain },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'similar-web.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching analytics for domain ${domain}:`, error);
    throw error;
  }
};

// Rate limiter function
const createRateLimiter = (limit: number, interval: number) => {
  let currentRequests = 0;
  const queue: (() => void)[] = [];

  const processQueue = () => {
    while (queue.length > 0 && currentRequests < limit) {
      currentRequests++;
      const resolve = queue.shift();
      if (resolve) resolve();
    }
  };

  setInterval(() => {
    currentRequests = 0; // Reset the counter every interval
    processQueue();
  }, interval);

  return () =>
    new Promise<void>(resolve => {
      queue.push(resolve);
      processQueue();
    });
};

// Main function
export const totalAnalysis = async (
  domains: string[]
): Promise<{ analysis_report: any[]; competition_report: any[] }> => {
  const RATE_LIMIT = 5;
  const TIME_INTERVAL = 1200; // 1 second
  const rateLimiter = createRateLimiter(RATE_LIMIT, TIME_INTERVAL);

  const analysis_report: any[] = [];
  const competition_report: any[] = [];

  for (const domain of domains) {
    // Respect rate limit for each request
    const [similarSites, analytics] = await Promise.all([
      (async () => {
        await rateLimiter();
        return getSimilarSites(domain);
      })(),
      (async () => {
        await rateLimiter();
        return getAnalytics(domain);
      })(),
    ]);

    analysis_report.push({...analytics,Countries:[]});
    competition_report.push({...similarSites,Countries:[]});
  }

  return { analysis_report, competition_report };
};