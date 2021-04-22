import './index.scss';

import { TooltipPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new TooltipPlugin();
}
export { TooltipPluginSetup, TooltipPluginStart } from './types';
