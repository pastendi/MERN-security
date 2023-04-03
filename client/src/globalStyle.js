import { createGlobalStyle } from 'styled-components'
export const global = {
  neon: '#0ef',
  bgColor: '#F0F4F8',
  btnColor: '#1B74E4',
  navColor: '#94a3b8',
  primary1: '#e2e0ff',
  primary2: '#c1beff',
  primary3: '#a29dff',
  primary4: '#837dff',
  primary5: '#645cff',
  primary8: '#282566',
  primary10: '#141233',
  spacing: '0.1rem',
  radius: '0.25rem',
  maxWidth: '1120px',
  fixedWidth: '600px',
  transition: 'all 0.3s linear',
  lightShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  darkShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
}
export const GlobalStyle = createGlobalStyle`

/* ============= GLOBAL CSS =============== */

*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 100%;
} /*16px*/


body {
  background: ${global.bgColor};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 400;
  line-height: 1;
  color: #0f172a;
}
p {
  margin: 0;
  color: black;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 400;
  line-height: 1;
  text-transform: capitalize;
  letter-spacing: ${global.spacing};
  color: black;
}

h1 {
  font-size: 3.052rem;
}

h2 {
  font-size: 2.441rem;
}

h3 {
  font-size: 1.953rem;
}

h4 {
  font-size: 1.563rem;
}

h5 {
  font-size: 1.25rem;
}

.text {
  margin-bottom: 1.5rem;
  max-width: 40em;
}

small,
.text-small {
  font-size: 0.875rem;
}

a {
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}

.img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
/* buttons */

.btn {
  cursor: pointer;
  color: white;
  background: ${global.btnColor};
  border: transparent;
  border-radius: ${global.radius};
  letter-spacing: ${global.spacing};
  padding: 0.375rem 0.75rem;
  box-shadow: ${global.lightShadow};
  transition: ${global.transition};
  text-transform: capitalize;
  display: inline-block;
}
.btn:hover {
  background: #7c3aed;
  box-shadow: ${global.darkShadow};
}
.btn-hipster {
  color: ${global.primary5};
  background: ${global.primary2};
}
.btn-hipster:hover {
  color: ${global.primary2};
  background: ${global.primary5};
}
.btn-block {
  width: 100%;
}


@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.loading {
  width: 6rem;
  height: 6rem;
  border: 5px solid #e2e8f0;
  border-radius: 50%;
  border-top-color: ${global.primary5};
  animation: spinner 0.6s linear infinite;
  margin: 0 auto;
}

.page{
  min-height: 100vh;
}
`
