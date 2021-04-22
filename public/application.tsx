import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { TooltipApp } from './components/app';

export const renderApp = (
  { notifications, http }: CoreStart,
  { element }: AppMountParameters
  ) => {
  ReactDOM.render(
<TooltipApp/>,
  element
  );
  console.log("tooltip created");
  return () => ReactDOM.unmountComponentAtNode(element);
};
