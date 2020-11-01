export const redirector = {
  methods: {
    async redirectionTo(pathName = "test") {
      await this.$router.push({ name: pathName });
    }
  }
};
