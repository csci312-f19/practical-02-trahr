const colorPicker = require('./color-picker');

describe('Test createSlider', () => {
  test('Test slider structure', () => {
    const slider = colorPicker.createSlider('red', 192, () => {});
    expect(slider.tagName).toEqual('DIV');
    expect(slider.className).toEqual('red-slider');
    expect(slider.children.length).toEqual(3);

    const label = slider.children.item(0);
    expect(label.tagName).toEqual('DIV');
    expect(label.className).toEqual('color-label');
    expect(label.innerHTML).toEqual('red:');

    const range = slider.children.item(1);
    expect(range.tagName).toEqual('INPUT');
    expect(range.type).toEqual('range');
    expect(range.min).toEqual('0');
    expect(range.max).toEqual('255');
    expect(range.value).toEqual('192');

    const readout = slider.children.item(2);
    expect(readout.tagName).toEqual('SPAN');
    expect(readout.innerHTML).toEqual('192');
  });

  test('test read out update', () => {
    const slider = colorPicker.createSlider('red', 192, () => {});
    const range = slider.children.item(1);
    const readout = slider.children.item(2);
    expect(readout.innerHTML).toEqual('192');
    range.value = 255;
    range.oninput(); // fire the oninput event manually
    expect(readout.innerHTML).toEqual('255');
  });

  test('test callback', (done) => {
    const callback = (value) => {
      expect(value).toEqual({ red: 255 });
      done();
    };


    const slider = colorPicker.createSlider('red', 192, callback);
    const range = slider.children.item(1);
    range.value = 255;
    range.oninput();
  });
});


describe('Test createColorPicker', () => {
  test('Test picker structure', () => {
    const currentColor = { red: 255, green: 0, blue: 0 };
    const picker = colorPicker.createColorPicker(currentColor, () => {});
    expect(picker.tagName).toEqual('DIV');
    expect(picker.className).toEqual('color-picker');
    expect(picker.children.length).toEqual(4);

    const swatch = picker.children.item(0);
    expect(swatch.tagName).toEqual('DIV');
    expect(swatch.className).toEqual('color-swatch');

    ['red', 'green', 'blue'].forEach((color, index) => {
      const slider = picker.children.item(index + 1);
      expect(slider.tagName).toEqual('DIV');
      expect(slider.className).toEqual(`${color}-slider`);
    });
  });

  test('Test swatch color', () => {
    const currentColor = { red: 255, green: 192, blue: 64 };
    const picker = colorPicker.createColorPicker(currentColor, () => {});
    const swatch = picker.children.item(0);

    expect(swatch.style.background).toEqual('rgb(255, 192, 64)');
  });

  test('Test swatch color update', () => {
    const currentColor = { red: 255, green: 192, blue: 64 };
    const picker = colorPicker.createColorPicker(currentColor, () => {});
    const swatch = picker.children.item(0);
    const redInput = picker.querySelector('.red-slider input');
    const greenInput = picker.querySelector('.green-slider input');
    const blueInput = picker.querySelector('.blue-slider input');

    redInput.value = 64;
    redInput.oninput();
    expect(swatch.style.background).toEqual('rgb(64, 192, 64)');

    greenInput.value = 255;
    greenInput.oninput();
    expect(swatch.style.background).toEqual('rgb(64, 255, 64)');

    blueInput.value = 192;
    blueInput.oninput();
    expect(swatch.style.background).toEqual('rgb(64, 255, 192)');
  });

  test('Test callback', (done) => {
    let iteration = 0;
    const callback = (value) => {
      if (iteration === 0) {
        expect(value).toEqual({ red: 255, green: 0, blue: 0 });
      } else {
        expect(value).toEqual({ red: 255, green: 255, blue: 0 });
        done();
      }
      iteration += 1;
    };
    const currentColor = { red: 255, green: 0, blue: 0 };
    const picker = colorPicker.createColorPicker(currentColor, callback);
    const greenInput = picker.querySelector('.green-slider input');
    greenInput.value = 255;
    greenInput.oninput();
  });
});
