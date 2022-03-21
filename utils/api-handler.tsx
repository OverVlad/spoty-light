import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Method = 'head' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'trace' | string;

type ApiHandler = {
  [key: Method]: NextApiHandler;
};

const errorHandler = (err: unknown, res: NextApiResponse) => {
  if (axios.isAxiosError(err)) {
    return res.status(err.response?.status || 500).json({
      code: err.response?.data.code || 'ApiRequestError',
      message: err.response?.data?.attributes?.err || err.response?.data.message || 'Api request error',
    });
  } else {
    return res.status(500).json({ message: err });
  }
};

export const apiRouteHandler = (apiHandler: ApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase() || 'get';
    const handler = apiHandler[method];

    // check handler supports HTTP method
    if (!handler)
      return res.status(405).json({
        code: 'MethodNotAllowed',
        message: `Method ${req.method} now allowed`,
      });

    try {
      // route handler
      await handler(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
};
