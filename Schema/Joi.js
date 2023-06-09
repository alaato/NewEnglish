const Basejoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not inculde HTML'
  },
  rules: {
    escapedHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        })
        if(clean !== value) {
          return helpers.error('string.escapeHTML', {value});
        }
        return clean;
      }
    }
  }
 })
 const joi = Basejoi.extend(extension)

