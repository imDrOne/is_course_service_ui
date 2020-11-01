import EventBus from "@/EventBus";

export default {
  name: "LayoutDefault",
  mounted() {
    EventBus.$on("error", err => {
      console.log(err)
      this.$q.notify({
        title: "Ошибка",
        message: err,
        position: "top-right"
      });
    });
  }
};
