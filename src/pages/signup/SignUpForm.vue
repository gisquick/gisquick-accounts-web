<template>
  <form autocomplete="off" spellcheck="false">
    <!-- Hidden fields as workaround for chrome browser to ignore autocomplete/autofill -->
    <v-text-field
      autofocus
      label="Username"
      class="required"
      name="username"
      v-model="form.username"
      :error="validators.username.error"
      @input="validators.username.debouncedValidate"
      @blur="validators.username.validate(form.username)"
    >
      <template v-slot:append>
        <validator-mark :validator="validators.username"/>
      </template>
    </v-text-field>
    <v-text-field
      label="First name"
      name="first_name"
      v-model="form.first_name"
    />
    <v-text-field
      label="Last name"
      name="last_name"
      v-model="form.last_name"
    />
    <v-text-field
      label="Email"
      class="required"
      type="email"
      name="email"
      autocomplete="email"
      v-model="form.email"
      :error="validators.email.error"
      @input="validators.email.debouncedValidate"
      @blur="validators.email.validate(form.email)"
    >
      <template v-slot:append>
        <validator-mark :validator="validators.email"/>
      </template>
    </v-text-field>

    <v-text-field
      label="Password"
      class="required"
      :type="passwordVisible ? 'text' : 'password'"
      v-model="form.password1"
      :error="validators.password1.error"
      @blur="validators.password1.validate(form.password1)"
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
      v-model="form.password2"
      :error="validators.password2.error"
      @blur="validators.password2.validate(form.password2)"
      @keydown.enter="createAccount"
    />
    <div v-if="error" class="f-row f-justify-center error m-2">
      <v-icon name="circle-error-outline" class="mr-2"/>
      <p>Failed to create a new account</p>
    </div>

    <v-btn
      color="primary"
      :disabled="!formValid"
      :loading="processing"
      @click="createAccount"
    >
      <span>Create Account</span>
    </v-btn>
  </form>
</template>

<script>
import VTextField from '@/ui/TextField.vue'
import VBtn from '@/ui/Button.vue'
import VIcon from '@/ui/Icon.vue'
import VSpinner from '@/ui/Spinner.vue'

import { createValidator, requiredValidator, minLengthValidator, emailValidator } from '@/validators.js'

const ValidatorMark = {
  functional: true,
  props: {
    validator: Object
  },
  render (h, ctx) {
    const { error, validating, checked } = ctx.props.validator
    if (checked && !validating) {
      const symbol = error ? 'error_outline' : 'check_circle_outline'
      return <VIcon size={22} name={symbol} class="status-icon m-2"/>
    }
    return validating ? <VSpinner size="18" width="2" class="m-2"/> : null
  }
}

export default {
  components: {
    VTextField,
    VBtn,
    VIcon,
    ValidatorMark
  },
  data () {
    return {
      error: false,
      processing: false,
      passwordVisible: false,
      form: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: ''
      }
    }
  },
  computed: {
    validators () {
      return {
        username: createValidator([
          requiredValidator,
          minLengthValidator(3),
          value => this.checkLoginParam('username', value, 'A user with that username already exists.')
        ]),
        email: createValidator([
          requiredValidator,
          emailValidator,
          value => this.checkLoginParam('email', value, 'A user with that email already exists.')
        ]),
        password1: createValidator([
          requiredValidator,
          () => {
            if (this.form.password2) {
              this.validators.password2.validate(this.form.password2)
            }
          }
        ]),
        password2: createValidator([
          requiredValidator,
          value => value !== this.form.password1 && "Password doesn't match"
        ])
      }
    },
    formValid () {
      return Object.values(this.validators).every(v => v.checked && !v.validating && !v.error)
    }
  },
  methods: {
    async checkLoginParam (param, value, errMsg) {
      const response = await fetch(`/api/accounts/check_login/?${param}=${encodeURIComponent(value)}`)
      if (response.ok) {
        const data = await response.json()
        return !data.available && errMsg
      }
      return 'Failed to check availability'
    },
    async createAccount () {
      this.processing = true
      const response = await fetch('/api/accounts/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
      this.processing = false
      if (response.ok) {
        this.error = false
        this.$emit('submit')
      } else {
        this.error = true
        if (response.status === 400) {
          const data = await response.json()
          Object.keys(data).forEach(key => {
            if (this.validators[key]) {
              this.validators[key].error = data[key][0]
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  font-size: 14px;
}
.spinner {
  align-self: center;
}
.status-icon {
  --icon-color: var(--status-color, #505050);
}
form {
  --icon-color: #505050;
}
</style>