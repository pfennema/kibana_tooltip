import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CoreStart } from '../../../../src/core/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface TooltipAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
 }

export const TooltipApp = ({ basename, notifications, http, navigation }: TooltipAppDeps) => {
  const ref = useRef(document.querySelector("button[data-test-subj='indexPattern-switch-link']"));

  const handleMutations = useCallback((mutations) => {
    mutations.forEach(
      ({
        type,
        target
      }: {
        type: MutationRecordType;
        target: Element | null;
      }) => {
        if (type === 'attributes') {
        console.log(target?.getAttribute('indexPattern-switch-link'));
        }
      }
    );
  }, []);

  useMutationObserver({
    target: ref,
    options: { attributes: true },
    callback: handleMutations
  });
  // Render the application DOM.

  return (
<div id='tooltip_pf'></div>
  );
};
