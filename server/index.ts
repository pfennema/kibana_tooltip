import { PluginInitializerContext } from '../../../src/core/server';
import { TooltipPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new TooltipPlugin(initializerContext);
}

export { TooltipPluginSetup, TooltipPluginStart } from './types';
