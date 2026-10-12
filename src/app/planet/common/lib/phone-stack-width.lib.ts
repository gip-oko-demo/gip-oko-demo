import { finiteCssPx } from '@global/lib/common-global.lib';

/** Width of `.camera-height-container` as if it were max-content, not the stretched phone stack. */
export function phoneHeightPanelNaturalWidth(box: HTMLElement): number {
  const kids = [...box.children].filter((el): el is HTMLElement => el instanceof HTMLElement);
  const prevGrow = kids.map((el) => el.style.flexGrow);
  const prevShrink = kids.map((el) => el.style.flexShrink);
  for (const el of kids) {
    if (getComputedStyle(el).display === 'none') continue;
    el.style.flexGrow = '0';
    el.style.flexShrink = '0';
  }
  const cs = getComputedStyle(box);
  const padX = finiteCssPx(cs.paddingLeft) + finiteCssPx(cs.paddingRight);
  const childrenW = kids
    .filter((el) => getComputedStyle(el).display !== 'none')
    .reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
  kids.forEach((el, i) => {
    el.style.flexGrow = prevGrow[i] ?? '';
    el.style.flexShrink = prevShrink[i] ?? '';
  });
  return childrenW + padX;
}
