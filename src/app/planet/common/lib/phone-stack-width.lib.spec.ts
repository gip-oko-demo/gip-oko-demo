import { phoneHeightPanelNaturalWidth } from './phone-stack-width.lib';

function rect(width: number): DOMRect {
  return new DOMRect(0, 0, width, 44);
}

describe('phoneHeightPanelNaturalWidth', () => {
  it('ignores flex-grown extra space on the camera-height input', () => {
    const box = document.createElement('div');
    box.style.paddingLeft = '10px';
    box.style.paddingRight = '10px';
    const label = document.createElement('span');
    const input = document.createElement('input');
    input.style.flexGrow = '1';
    input.style.width = '5em';
    const unit = document.createElement('span');
    box.append(label, input, unit);
    document.body.append(box);

    vi.spyOn(label, 'getBoundingClientRect').mockReturnValue(rect(70));
    vi.spyOn(unit, 'getBoundingClientRect').mockReturnValue(rect(20));
    vi.spyOn(input, 'getBoundingClientRect').mockImplementation(() =>
      rect(input.style.flexGrow === '0' ? 80 : 300),
    );

    const first = phoneHeightPanelNaturalWidth(box);
    box.style.width = '400px';
    const second = phoneHeightPanelNaturalWidth(box);

    expect(first).toBe(70 + 80 + 20 + 20);
    expect(second).toBe(first);
    expect(input.style.flexGrow).toBe('1');

    document.body.removeChild(box);
  });
});
