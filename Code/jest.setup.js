const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body><canvas id="canvas"></canvas></body></html>', {
  url: 'http://localhost'
});

global.document = dom.window.document;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;

// Mock canvas context methods
HTMLCanvasElement.prototype.getContext = function() {
  return {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    fillText: jest.fn(),
    save: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    restore: jest.fn(),
    // Add any other context methods you use
  };
};