<script>
import { colorVar } from './utils/colors'

export default {
  functional: true,
  props: {
    label: String,
    focus: Function,
    error: String
  },
  render (h, ctx) {
    const { label, error, focus } = ctx.props
    if (label) {
      const style = error ? colorVar('red', 'status-color') : null
      return (
        <div class="field" style={style} {...ctx.data}>
          <label onClick={focus}>{label}</label>
          {ctx.children}
          <div class="error">{error}</div>
        </div>
      )
    }
    return ctx.children
  }
}
</script>

<style lang="scss">
.field {
  display: grid;
  margin: var(--gutter);
  position: relative;
  > *:nth-child(2) {
    --gutter: 0;
  }
  &.inline {
    align-items: center;
    grid-auto-flow: column;
    gap: 6px;
  }
  label {
    line-height: 1;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    opacity: 0.75;
    color: var(--status-color, currentColor);
    // color: var(--status-color, rgba(currentColor, 0.5));
  }
  &.focused {
    label {
      opacity: 1;
      color: var(--status-color, var(--color));
      // color: var(--color);
    }
  }
  &.required {
    label {
      font-weight: 700;
    }
  }
  .error {
    color: var(--color-red);
    font-size: 12.5px;
    // font-weight: 500;
    min-height: 20px;
    padding: 2px 0;
  }
}
</style>
