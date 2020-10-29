import Vue from "vue";

import "./styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import iconSet from "quasar/icon-set/mdi-v4.js";
import lang from "quasar/lang/ru.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import Quasar from "quasar";
import { Notify, Dialog, LoadingBar } from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Dialog,
    LoadingBar
  },
  lang: lang,
  iconSet: iconSet
});
