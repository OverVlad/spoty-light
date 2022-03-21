import { apiRouteHandler } from '../../utils/api-handler';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<void>) => {
    const { query } = req.query as { query: string };

    // Temp solution
    // eslint-disable-next-line no-console
    console.log(query);

    res.status(200).end();
  },
});
