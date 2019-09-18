
/**
This function creates a single labeled slider.

The end result should be a labeled slider that reports its current value and
returns all changes via a callback. The callback is passed an object of the form
{color-name: value}, where color-name is the string passed in as the color parameter.

@param {string} color - name to use a label and the key for the callback's argument
@param {int} initialValue - the initial value of the slider
@param {Object~} callback - passed the new value object on changes to the slider

*/
const createSlider = function createSlider(color, initialValue, callback) {
  // create a div to hold all of the slider elements
  const slider = document.createElement('div');
  slider.className = `${color}-slider`;

  // create a div to hold the color name and add it to the slider
  const label = document.createElement('div');
  label.className = 'color-label';
  label.innerHTML = `${color}:`;

  slider.appendChild(label);

  // create the range input and add it to the slider
  const range = document.createElement('input');
  range.type = 'range';
  range.min = 0;
  range.max = 255;
  range.value = initialValue;

  slider.appendChild(range);

  // create the readout to display the current value and add it to the slider
  const readout = document.createElement('span');
  readout.innerHTML = initialValue;

  slider.appendChild(readout);


  // set the range input's oninput function to update the readout and call the callback
  range.oninput = () => {
    readout.innerHTML = range.value;
    callback({ [color]: parseInt(range.value, 10) });
  };

  // return the slider
  return (slider);
};


/**
This function creates a color picker component.

This returns a div containing a color swatch and three sliders for setting the red, green,
and blue channels of the color. The callback is called with an object of the form
{red: 0, green: 0, blue: 0}
whenever the value of the color changes.

@param {Object} initialValue - an object containing red, green, and blue properties
@param {Object~} callback - passed the new value object on changes to the slider

*/
const createColorPicker = function createColorPicker(initialValue, callback) { // eslint-disable-line no-unused-vars, max-len
  // create a div to hold the picker
  const picker = document.createElement('div');
  picker.className = 'color-picker';

  // create a div with the class 'color-swatch' to provide the colored rectangle
  // and add it to the picker
  const colorBox = document.createElement('div');
  colorBox.className = 'color-swatch';

  picker.appendChild(colorBox);

  // create a local variable to hold the current color and initialize it with initialValue
  let currentColor = initialValue;

  // create an update function that takes in an object of the form {color: value}
  // this should:
  // - merge the change into the the current color
  // - set the background color of the swatch
  // - call the callback with the current color

  const update = function (newColor) {
    currentColor = { ...currentColor, ...newColor };
    const { red, green, blue } = currentColor;

    colorBox.style.background = `rgb(${red}, ${green}, ${blue})`;

    callback(currentColor);
  };

  // add sliders for each color channel
  Object.keys(currentColor).forEach((color) => {
    // initialize slider in here
    const slider = createSlider(color, currentColor[color], update);
    picker.appendChild(slider);
  });

  // call update() to initialize to the correct value

  update();

  // return the picker

  return (picker);
};

try {
  module.exports = {
    createSlider,
    createColorPicker,
  };
} catch (e) {
  // ignore -- must be in the browser
}
