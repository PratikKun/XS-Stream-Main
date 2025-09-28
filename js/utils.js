/**
 * Utility functions for XS Stream
 */

// DOM helper functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Creates an element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Attributes to set
 * @param {Array|string} children - Child elements or text content
 * @returns {HTMLElement}
 */
function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  if (typeof children === 'string') {
    element.textContent = children;
  } else {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safely parses JSON with a default value
 * @param {string} jsonString - JSON string to parse
 * @param {*} defaultValue - Default value if parsing fails
 * @returns {*} Parsed JSON or default value
 */
function safeJSONParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON Parse Error:', e);
    return defaultValue;
  }
}

/**
 * Formats error messages for display
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
function formatError(error) {
  return `An error occurred: ${error.message}. Please try again later.`;
}

/**
 * Checks if a value is defined and not null
 * @param {*} value - Value to check
 * @returns {boolean}
 */
function isDefined(value) {
  return value !== undefined && value !== null;
}

export {
  $,
  $$,
  createElement,
  debounce,
  safeJSONParse,
  formatError,
  isDefined
};