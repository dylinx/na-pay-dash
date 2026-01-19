<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div
      :class="[
        'py-8 flex',
        !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
      ]"
    >
      <router-link to="/">
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="dark:hidden"
          src="/images/logo/logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="hidden dark:block"
          src="/images/logo/auth-logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-else
          src="/images/logo/icon.svg"
          alt="Logo"
          width="32"
          height="32"
        />
      </router-link>
    </div>

    <!-- Account Switcher -->
    <div
      v-if="authStore.accounts?.data?.length > 1"
      :class="[
        'px-4 mb-6 relative',
        !isExpanded && !isHovered ? 'lg:justify-center flex' : 'block',
      ]"
    >
      <div v-if="isExpanded || isHovered || isMobileOpen" class="mb-2 px-1">
        <span class="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Switch Account
        </span>
      </div>

      <div class="relative" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          :class="[
            'flex items-center w-full gap-3 px-3 py-2 text-left transition-all duration-200 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750 group outline-none',
            !isExpanded && !isHovered ? 'lg:p-2 lg:justify-center lg:w-10 lg:h-10' : '',
            isDropdownOpen ? 'ring-2 ring-brand-500 border-brand-500' : ''
          ]"
        >
          <!-- Logo/Initials -->
          <div class="flex-shrink-0 w-8 h-8 overflow-hidden rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
            <img 
              v-if="currentAccount?.logo" 
              :src="currentAccount.logo" 
              class="w-full h-full object-cover"
              alt="Logo"
            />
            <span v-else class="text-[10px] font-bold text-brand-600 dark:text-brand-400">
              {{ getInitials(currentAccount?.mname) }}
            </span>
          </div>

          <!-- Account Info -->
          <div v-if="isExpanded || isHovered || isMobileOpen" class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {{ currentAccount?.mname }}
            </p>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate uppercase tracking-tighter">
              {{ currentAccount?.mid }}
            </p>
          </div>

          <!-- Arrow -->
          <ChevronDownIcon 
            v-if="isExpanded || isHovered || isMobileOpen"
            :class="['w-4 h-4 text-gray-400 transition-transform duration-200', isDropdownOpen ? 'rotate-180' : '']" 
          />
        </button>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute left-0 z-50 w-64 mt-2 origin-top-left bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            :class="[!isExpanded && !isHovered ? 'lg:left-full lg:ml-2 lg:-top-2' : '']"
          >
            <div class="max-h-[300px] overflow-y-auto no-scrollbar py-1">
              <button
                v-for="account in authStore.accounts?.data"
                :key="account.mid"
                @click="selectAccount(account.mid)"
                :class="[
                  'flex items-center w-full gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors',
                  account.mid === authStore.metaData?.currentMid ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''
                ]"
              >
                <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                  <img 
                    v-if="account.logo" 
                    :src="account.logo" 
                    class="w-full h-full object-cover"
                    alt="Logo"
                  />
                  <span v-else class="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                    {{ getInitials(account.mname) }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ account.mname }}
                  </p>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {{ account.mid }}
                  </p>
                </div>
                <div v-if="account.mid === authStore.metaData?.currentMid" class="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar"
    >
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(
                          groupIndex,
                          index
                        ),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                </router-link>
                <transition
                  @enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) &&
                      (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(
                                subItem.path
                              ),
                              'menu-dropdown-item-inactive': !isActive(
                                subItem.path
                              ),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SidebarWidget v-if="isExpanded || isHovered || isMobileOpen" />
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import {
  GridIcon,
  ChevronDownIcon,
  HorizontalDots,
  ListIcon,
  UserGroupIcon,
  LinkIcon,
  ArrowsPointInIcon,
  ArrowsPointOutIcon,
  ChevronUpDownIcon,
} from "../../icons";
import SidebarWidget from "./SidebarWidget.vue";
import { useSidebar } from "@/composables/useSidebar";

const route = useRoute();
const authStore = useAuthStore();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const currentAccount = computed(() => {
  return authStore.accounts?.data?.find(
    (acc) => acc.mid === authStore.metaData?.currentMid
  );
});

const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const selectAccount = async (mid) => {
  isDropdownOpen.value = false;
  if (mid === authStore.metaData?.currentMid) return;
  try {
    await authStore.switchAccount(mid);
  } catch (error) {
    console.error("Failed to switch account:", error);
  }
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const menuGroups = [
  {
    title: "Menu",
    items: [
      {
        icon: GridIcon,
        name: "Dashboard",
        path: "/",
      },

      {
        name: "Collections",
        icon: ArrowsPointInIcon,
        subItems: [
          { name: "Collections", path: "/collections" },
          { name: "Refunds", path: "/refunds" },
        ],
      },
      {
        name: "Disbursements",
        icon: ArrowsPointOutIcon,
        subItems: [
          { name: "Disbursements", path: "/disbursements" },
          { name: "Internal Transfers", path: "/internal-transfers" },
        ],
      },
      {
        name: "Settlements",
        icon: ListIcon,
        path: "/settlements",
      },
      {
        name: "Invoices",
        icon: LinkIcon,
        path: "/invoices",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        icon: UserGroupIcon,
        name: "Users & Roles",
        subItems: [
          { name: "Users", path: "/users" },
          { name: "Roles", path: "/roles" },
        ],
      },
      {
        icon: ChevronUpDownIcon,
        name: "Audit Trail",
        path: "/activities",
      },
    ],
  },
];

const isActive = (path) => route.path === path;

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path)
      ))
  );
};

const startTransition = (el) => {
  el.style.height = "auto";
  const height = el.scrollHeight;
  el.style.height = "0px";
  el.offsetHeight; // force reflow
  el.style.height = height + "px";
};

const endTransition = (el) => {
  el.style.height = "";
};
</script>
