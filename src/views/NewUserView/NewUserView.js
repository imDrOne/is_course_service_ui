import apiUsers from "@/api/users.api";
import EventBus from "@/EventBus";
import {
  validateConfirmPassword,
  validateFormatPassword,
  validateEmail
} from "@/utils/validations";
import { formValidation } from "@/components/mixins/formValidator";

export default {
  mixins: [formValidation],
  data: () => ({
    firstName: null,
    lastName: null,
    login: null,
    password: null,
    confirmPassword: null,
    permissions: [],
    permissionDTO: null
  }),
  async mounted() {
    try {
      await this.loadPermissions();
    } catch (e) {
      if (e === "try") {
        this.loadPermissions().catch(err => EventBus.$emit("error", err));
      } else EventBus.$emit("error", e);
    }
  },
  methods: {
    async loadPermissions() {
      const { data } = await apiUsers.getAllPermissions();
      this.permissionDTO = data;
    },
    async createUser() {
      await this.$store.dispatch("users/CREATE_USER", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.login,
        password: this.password,
        permissions:
          this.permissions.map(perm => perm.permissionCode) || undefined
      });
    },
    async onSubmit() {
      try {
        await this.validateForm();
        await this.createUser();
      } catch (e) {
        if (e === "try") {
          this.createUser().catch(err => EventBus.$emit("error", err));
        } else EventBus.$emit("error", e);
      }
    },
    goBack() {
      // ...
    },

    validateNullify(value, message) {
      return !!value || message;
    },
    sourcePasswordValidate(password) {
      const result = validateFormatPassword(password);

      if (typeof result === "object") {
        this.helper = true;
        return result.message;
      } else {
        this.helper = false;
        return true;
      }
    },
    confirmationPasswordValidate(password) {
      const result = validateConfirmPassword(password, this.password);
      return typeof result === "object" ? result.message : true;
    },
    emailFormatValidation(email) {
      const result = validateEmail(email);
      return typeof result === "object" ? result.message : true;
    }
  }
};
