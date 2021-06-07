import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { TooltipPluginSetup, TooltipPluginStart } from './types';
import { registerRoutes } from './routes/registerRoutes';

export class TooltipPlugin implements Plugin<TooltipPluginSetup, TooltipPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.info('tooltip: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    registerRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.info('tooltip: Started');
    return {};
  }

  public stop() {}
}
