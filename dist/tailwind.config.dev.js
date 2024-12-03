"use strict";

module.exports = {
  content: ["./*.html" // Include all HTML files in the root directory
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-grid': "url('/path-to-your-image.jpg')"
      }
    }
  },
  plugins: []
};