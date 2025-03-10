module.exports = {
    createCanvas: () => ({
      getContext: () => ({
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        fillText: jest.fn(),
        save: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        restore: jest.fn(),
      }),
    }),
  };