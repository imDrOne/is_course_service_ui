import { permissions } from "@/components/mixins/permissions";
import { redirector } from "@/components/mixins/redirector";

export default {
  data: () => ({}),
  mixins: [permissions, redirector]
};
