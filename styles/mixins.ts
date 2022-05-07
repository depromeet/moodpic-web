import { css } from 'styled-components';

const a11y = css`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);

  width: 0.1rem;
  height: 0.1rem;

  white-space: nowrap;
`;

const transition = (prop = null, time = null, func = null) => {
  return css`
    transition-timing-function: ${func ||
    'cubic-bezier(0.645, 0.045, 0.355, 1)'};
    transition-duration: ${time || '0.3s'};
    transition-property: ${prop || 'all'};
  `;
};

const ellipsis = (lines = 0) => {
  return lines
    ? css`
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${lines};
        text-overflow: ellipsis;
        word-wrap: normal;
      `
    : css`
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      `;
};

export { a11y, transition, ellipsis };
