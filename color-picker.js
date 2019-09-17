
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
 

  // create a div to hold the color name and add it to the slider


  // create the range input and add it to the slider
  

  // create the readout to display the current value and add it to the slider
  

  // set the range input's oninput function to update the readout and call the callback
  

  // return the slider

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
  

  // create a div with the class 'color-swatch' to provide the colored rectangle
  // and add it to the picker
  

  // create a local variable to hold the current color and initialize it with initialValue
  

  // create an update function that takes in an object of the form {color: value}
  // this should:
  // - merge the change into the the current color
  // - set the background color of the swatch
  // - call the callback with the current color
  

  // add sliders for each color channel
  

  // call update() to initialize to the correct value
  

  // return the picker
  
};

try {
  module.exports = {
    createSlider,
    createColorPicker,
  };
} catch (e) {
  // ignore -- must be in the browser
}
