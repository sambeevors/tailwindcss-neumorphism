const Color = require('color')
const _ = require('lodash')
const plugin = require('tailwindcss/plugin')

const invalidKeywords = [
  'currentcolor',
  'transparent',
  'unset',
  'initial',
  'inherit',
]

const flattenColorPalette = function (colors) {
  const result = _(colors)
    .flatMap((color, name) => {
      if (!_.isObject(color)) {
        return [[name, color]]
      }

      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`
        return [`${name}${suffix}`, value]
      })
    })
    .fromPairs()
    .value()

  return result
}

module.exports = plugin(function ({ addUtilities, e, theme, variants }) {
  const pairs = _.flatten(
    _.map(
      flattenColorPalette(theme('neumorphism', theme('backgroundColor'))),
      (value, modifier) => {
        if (invalidKeywords.includes(value.toLowerCase())) return []
        let baseColor
        let shadowColor
        let highlightColor
        let shadowGradient
        let highlightGradient

        try {
          baseColor = Color(value).hex()
          shadowColor = Color(value).darken(0.25).hex()
          highlightColor = Color(value).lighten(0.25).hex()
          shadowGradient = Color(value).darken(0.2).hex()
          highlightGradient = Color(value).lighten(0.2).hex()
        } catch {
          console.log(
            `tailwind-neumorphism: Something went wrong generating shades of '${modifier}' (${value}). Skipping.`
          )
          return []
        }

        return [
          [
            `.${e(`nm-flat-${modifier}`)}`,
            {
              background: baseColor,
              boxShadow: `0.15em 0.15em 0.3em ${shadowColor}, -0.15em -0.15em 0.3em ${highlightColor};`,
            },
          ],
          [
            `.${e(`nm-concave-${modifier}`)}`,
            {
              background: `linear-gradient(145deg, ${highlightGradient}, ${shadowGradient});`,
              boxShadow: `0.15em 0.15em 0.3em ${shadowColor}, -0.15em -0.15em 0.3em ${highlightColor};`,
            },
          ],
          [
            `.${e(`nm-convex-${modifier}`)}`,
            {
              background: `linear-gradient(145deg, ${shadowGradient}, ${highlightGradient});`,
              boxShadow: `0.15em 0.15em 0.3em ${shadowColor}, -0.15em -0.15em 0.3em ${highlightColor};`,
            },
          ],
          [
            `.${e(`nm-inset-${modifier}`)}`,
            {
              background: baseColor,
              boxShadow: `inset 0.15em 0.15em 0.3em ${shadowColor}, inset -0.15em -0.15em 0.3em ${highlightColor};`,
            },
          ],
        ]
      }
    )
  )

  const utilities = _.fromPairs(pairs)

  addUtilities(
    utilities,
    variants('neumorphisms', ['responsive', 'hover', 'focus'])
  )
})
