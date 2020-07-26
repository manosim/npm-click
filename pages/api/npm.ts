import { NextApiRequest, NextApiResponse } from 'next';
import Joi from '@hapi/joi';
import axios from 'axios';

const API_URL = 'https://api.npms.io/v2/package/';

const dataSchema = Joi.object({
  packages: Joi.array().items(Joi.string()).required(),
}).required();

const fetchData = async (packages) => {
  const requests = packages.map((depName: string) => {
    return axios.get(`${API_URL}${encodeURIComponent(depName)}`, {
      validateStatus: (status: number) =>
        (status >= 200 && status < 300) || status === 404,
    });
  });

  try {
    const response = await Promise.all(requests);
    return response.map(({ data, config }) => {
      const name = decodeURIComponent(config.url.replace(API_URL, ''));

      try {
        const latestVersion = data.collected.metadata.version;
        return { name, latestVersion, failed: false };
      } catch (_) {
        return { name, latestVersion: null, failed: true };
      }
    });
  } catch (err) {
    throw new Error(
      'Something went wrong and could not read all packages from the API.'
    );
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end();
  }

  try {
    await dataSchema.validateAsync(req.body);
    const response = await fetchData(req.body.packages);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } catch (err) {
    res.status(400).json({ statusCode: 404, message: err.message });
  }
};
