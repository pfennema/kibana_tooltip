import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';

export function registerGetDataDictionaryRoute(router: IRouter) {
     router.get(
        {
            path: '/api/tooltip/get_data_dictionary/',
            validate: false
        },
        async (context, request, response) => {
            console.log("Get data dictionary");
            var dd = {};
            const client = context.core.elasticsearch.client.asCurrentUser;
            const result = await client.search({
              index: "tooltip",
              size: 10000,  // be careful, there can not be more than 10000 tooltips right now! Otherwise the scroll api needs to be implemented.
              body: {
                query: {
                  match_all: {}
                }
             }
            });

            var tooltips = result.body.hits.hits;
            var tooltip, t;
            for (t in tooltips) {
              tooltip = tooltips[t];
              dd[ tooltip['_source']['field']] = tooltip['_source']['description'];
            }
            return response.ok({
                body: dd,
            });
        }
    );
}

