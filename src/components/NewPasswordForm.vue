<template>
  <form autocomplete="off" spellcheck="false">
    <p
      v-if="error"
      class="error--text"
      v-text="error"
    />
    <p v-else class="mx-2 my-4">Please enter your new password twice so we can verify you typed it in correctly.</p>
    <v-text-field
      autofocus
      label="New password"
      class="required"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="form.new_password1"
      :error="validators.new_password1.error"
      @blur="validators.new_password1.validate(form.new_password1)"
    >
      <template v-slot:append>
        <v-btn
          aria-label="Toggle password visibility"
          tabindex="-1"
          class="icon transparent"
          @click="passwordVisible = !passwordVisible"
        >
          <v-icon :name="passwordVisible ? 'visibility' : 'visibility_off'"/>
        </v-btn>
      </template>
    </v-text-field>
    <v-text-field
      label="Confirm password"
      class="required"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="form.new_password2"
      :error="validators.new_password2.error"
      @blur="validators.new_password2.validate(form.new_password2)"
      @keydown.enter="onSubmit"
    />
    <v-btn
      color="primary"
      :disabled="!canSubmit"
      :loading="processing"
      @click="onSubmit"
    >
      {{ submitText }}
    </v-btn>
  </form>
</template>

<script>
import VTextField from '@/ui/TextField.vue'
import VBtn from '@/ui/Button.vue'
import VIcon from '@/ui/Icon.vue'
import { createValidator, requiredValidator } from '@/validators.js'

export default {
  components: {
    VTextField,
    VBtn,
    VIcon
  },
  props: {
    error: String,
    processing: Boolean,
    submitText: String
  },
  data () {
    return {
      passwordVisible: false,
      form: {
        new_password1: '',
        new_password2: ''
      }
    }
  },
  computed: {
    canSubmit () {
      return !this.processing && this.formValid
    },
    validators () {
      return {
        new_password1: createValidator([
          requiredValidator,
          () => {
            if (this.form.new_password2) {
              this.validators.new_password2.validate(this.form.new_password2)
            }
          }
        ]),
        new_password2: createValidator([
          requiredValidator,
          value => value !== this.form.new_password1 && "Password doesn't match"
        ])
      }
    },
    formValid () {
      return Object.values(this.validators).every(v => v.checked && !v.validating && !v.error)
    }
  },
  methods: {
    onSubmit () {
      if (this.canSubmit) {
        this.$emit('submit', this.form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  p {
    font-size: 14px;
    &:not(.error--text) {
      color: #555;
    }
  }
}
</style>
