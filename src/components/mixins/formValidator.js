export const formValidation = {
  methods: {
    validateForm(ref = "form") {
      return new Promise((resolve, reject) => {
        this.$refs[ref].validate()
          ? resolve("success")
          : reject("ValidationFormError");
      });
    }
  }
};
