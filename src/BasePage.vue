<template>
  <div class="app">
    <!-- <div class="bg-logo">
      <img src="./assets/image_logo.svg" class="bg-logo">
    </div> -->
    <logo class="bg-logo" height="80vh" width="100%"/>
    <div class="spacer"/>
    <div class="content">
      <text-logo class="text-logo" height="60" width="300"/>
      <slot/>
    </div>
    <div class="spacer"/>
    <div class="spacer"/>
  </div>
</template>

<script>
import Logo from '@/assets/image_logo.svg?inline'
import TextLogo from '@/assets/text_logo_dark.svg?inline'
import '@/ui/layout.scss'
import '@/assets/fonts/fonts.css'

export default {
  components: {
    Logo,
    TextLogo
  }
}
</script>

<style lang="scss">
@import '@/theme.scss';

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
::-moz-focus-inner {
  border:0;
}

body {
  font-family: "Roboto";
  background-color: #111;
  min-width: 100%;
  overflow: auto;
}

h1 {
  margin: 16px 8px;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 100vh;

  .bg-logo {
    position: fixed;
    top: 10%;
    right: 0;
    width: auto;
    z-index: -1;
    transform: translate(40%, 0);
    @media (max-width: 720px) {
      display: none;
    }
  }
  // img.bg-logo {
  //   height: 80vh;
  // }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: clamp(300px, 440px, 100%);
    color: #fff;
  }
  .text-logo {
    margin: 12px 12px 24px 12px;
  }
  .spacer {
    flex: 1 1;
  }
}

form {
  align-self: stretch;
  background-color: #f3f3f3;
  margin: 24px 12px;
  padding: 24px 12px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  color: #222;
  --gutter: 6px;
  --fill-color: #fff;
  --icon-color: #333;

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px var(--fill-color) inset;
    // -webkit-text-fill-color: currentColor;
  }

  ::v-deep {
    .text-field {
      --icon-color: var(--status-color, #444);
    }
  }

  @media (max-width: 600px) {
    padding: 16px 6px;
  }
}
.error {
  color: var(--color-red);
  --icon-color: var(--color-red);
}
</style>
