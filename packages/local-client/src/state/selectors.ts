import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {preprocessCellContent} from './preprocess-code';

const showFunc = `
    var show = (value) => {
      const container = document.querySelector('#root');
      if (!container) return;

      if (typeof value === 'object' && value !== null && value.$$typeof && value.props) {
        ReactDOM.render(value, container);
      } else if (typeof value === 'object' && value !== null) {
        ReactDOM.render(
          React.createElement('pre', null, JSON.stringify(value, null, 2)),
          container
        );
      } else {
        ReactDOM.render(
          React.createElement('pre', null, String(value)),
          container
        );
      }
    };
    `;

const showFuncNoOp = 'var show = () => {}';

export const selectCumulativeCode = createSelector(
    [
        (state: RootState) => state.cells.order,
        (state: RootState) => state.cells.data,
        (_state: RootState, cellId: string) => cellId,
    ],
    (order, data, cellId) => {
        const orderedCell = order.map((id) => data[id]);
        const cumulativeCode: string[] = [];

        for (const c of orderedCell) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCode.push(showFunc);
                } else {
                    cumulativeCode.push(showFuncNoOp);
                }
                cumulativeCode.push(preprocessCellContent(c.content));
            }
            if (c.id === cellId) {
                break;
            }
        }
        return cumulativeCode.join('\n');
    }
);

export const selectOrderedCells = createSelector(
    (state: RootState) => state.cells.order,
    (state: RootState) => state.cells.data,
    (order, data) => order.map((id) => data[id])
);
