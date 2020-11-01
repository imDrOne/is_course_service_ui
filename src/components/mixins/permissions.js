import { mapGetters } from "vuex";

export const permissions = {
  computed: {
    ...mapGetters({
      permissions: "GET_CURRENT_PERMISSIONS"
    }),

    permissionsCodes() {
      if (!this.permissions || !this.permissions.length) return undefined;
      return this.permissions.map(permission => permission.code);
    }
  },
  methods: {
    checkPermission(code) {
      if (!this.permissionsCodes) return false;
      return this.permissionsCodes.includes(code);
    },
    permissionByCode(code) {
      if (!this.permissionsCodes) return undefined;
      return this.permissionsCodes.find(permission => permission === code);
    }
  }
};
