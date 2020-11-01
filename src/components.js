import Vue from "vue";

import Menu from "@/components/utils/UserMenu/index";
import UsersList from "@/components/UsersList/index";
import ActionsMenu from "@/components/utils/ActionsMenu/index";

Vue.component("d-user-menu", Menu);
Vue.component("d-users-list", UsersList);
Vue.component("d-actions-menu", ActionsMenu);
