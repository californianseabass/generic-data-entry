const sand = 'radix-ui/colors/sand'

// const radixColors = require('@radix-ui/colors')
// const { mapKeys, mapValues } = require('lodash')

// Transform the radix color map so that we can write things like
// text-radix-grass-11 instead of text-radix-grass-grass11
// const radix = mapValues(radixColors, (color, group) => {
//   return mapKeys(color, (value, name) =>
//     name.substring(group.endsWith('Dark') ? group.length - 4 : group.length)
//   )
// })



export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: { extend: { } },
  plugins: []
}
