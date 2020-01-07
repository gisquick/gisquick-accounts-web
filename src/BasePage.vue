<template>
  <div class="app">
    <!-- <div class="bg-logo">
      <img src="./assets/image_logo.svg" class="bg-logo">
    </div> -->
    <logo class="bg-logo" viewBox="0 0 120 120" height="80vh" width="100%"/>
    <div class="spacer"/>
    <div class="content">
      <text-logo class="text-logo" viewBox="0 0 750 100" height="50" width="300"/>
      <slot/>
    </div>
    <div class="spacer"/>
    <div class="spacer"/>
  </div>
</template>

<script>
import Logo from '@/assets/image_logo.svg?inline'
import TextLogo from '@/assets/text_logo_dark.svg?inline'

export default {
  components: {
    Logo,
    TextLogo
  }
}
</script>

<style lang="scss">
@import '@/theme.scss';

body {
  margin: 0;
  font-family: "Roboto", "Helvetica", "Lucida Grande","DejaVu Sans","Bitstream Vera Sans",Verdana,Arial;
  background-color: #111;
  min-width: 100%;
  overflow: auto;
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
    max-width: 440px;
    position: relative;
    box-sizing: border-box;
    min-width: 440px;
    color: #fff;

    @media (max-width: 460px) {
      min-width: 0;
      max-width: 100%;
      padding: 0 4px;
      .text-field {
        flex-direction: column;
        flex: 1;
        label {
          font-size: 12px;
        }
      }
    }
    > h1 {
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }
  .text-logo {
    margin: 8px 12px;
  }
  .spacer {
    flex: 1 1;
  }
}
</style>
