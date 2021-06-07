import { IRouter } from 'kibana/server';
import { registerGetDataDictionaryRoute } from './get_data_dictionary';

export function registerRoutes(router: IRouter) {
    registerGetDataDictionaryRoute(router);
}
