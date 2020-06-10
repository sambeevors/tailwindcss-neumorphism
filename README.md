# tailwindcss-neumorphism

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> Generate soft UI CSS code using tailwindcss

[Demo](https://tailwindcss-neumorphism-demo.netlify.app/)

## Why?

This plugin is inspired by [neumorphism.io](https://neumorphism.io/), as well as [this article](https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6) by Michal Malewicz which I highly recommend you check out.

![An example of Neumorphism](https://cdn.dribbble.com/users/2202649/screenshots/9527558/media/13076f9099e978de5f04c1bec809464f.png 'Freebie Neumorphic UX UI Elements by Emy Lascan on Dribbble')

## Getting Started

Install via npm or yarn

```
npm install tailwindcss-neumorphism
```

```
yarn add tailwindcss-neumorphism
```

Then just require it as a plugin.

```js
// tailwind.config.js
module.exports = {
  plugins: [require('tailwindcss-neumorphism')],
}
```

The plugin will generate 4 different utilities per color, in any number of sizes (default 5).

```css
.nm-flat-red-500 {
  background: #F56565;
  box-shadow: 0.2em 0.2em calc(0.2em * 2) #F01414, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #F9A6A6;
}

.nm-concave-red-500 {
  background: linear-gradient(145deg, #F23434, #F78585);
  box-shadow: 0.2em 0.2em calc(0.2em * 2) #F01414, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #F9A6A6;
}

.nm-convex-red-500 {
  background: linear-gradient(145deg, #F78585, #F23434);
  box-shadow: 0.2em 0.2em calc(0.2em * 2) #F01414, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #F9A6A6;
}

.nm-inset-red-500 {
  background: linear-gradient(145deg, #F78585, #F23434);
  box-shadow: inset 0.2em 0.2em calc(0.2em * 2) #F01414, inset calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #F9A6A6;
}

.nm-flat-red-500-lg {
  background: #F56565;
  box-shadow: 0.4em 0.4em calc(0.4em * 2) #F01414, calc(0.4em * -1) calc(0.4em * -1) calc(0.4em * 2) #F9A6A6;
}

/* ... */
```

### Colors

By default, neumorphism classes will be generated for all of your background colors. Alternatively, you can set these colors explicitly in the config under `neumorphismColor`.

```js
module.exports = {
  // ...
  theme: {
    neumorphismColor: {
      red: {
        100: '#FBEBE9',
        200: '#F5CEC7',
        // ...
      },
    },
  },
  // ...
}
```

### Sizes

You can change the sizes of the generated neumorphisms using the `neumorphismSize` property. There are 5 sizes by default, ranging from `xs` to `xl`. Setting a key of `default` will generate an unsuffixed class. Values can be generated from any valid sizing unit.

```js
module.exports = {
  // ...
  theme: {
    neumorphismSize: {
      xs: '0.05em',
      sm: '0.1em',
      default: '0.2em',
      lg: '0.4em',
      xl: '0.8em',
    },
  },
  // ...
}
```

### Variants

The default variants for each neumorphism utility are `responsive`, `hover` and `focus`. These can be configured [like any other tailwind utility](https://tailwindcss.com/docs/configuring-variants/), including being toggled on and off individually.

```js
module.exports = {
  // ...
  variants: {
    neumorphismFlat: ['responsive'],
    neumorphismConcave: false,
    neumorphismConvex: ['responsive', 'hover'],
    neumorphismInset: ['focus', 'active'],
  },
  // ...
}
```
