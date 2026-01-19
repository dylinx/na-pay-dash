import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    // Auth Routes
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    {
        path: '/otp',
        name: 'OtpVerify',
        component: () => import('../views/Auth/OtpVerify.vue'),
        meta: {
            title: 'Two-Step Verification'
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/Auth/ForgotPassword.vue'),
        meta: {
            title: 'Forgot Password'
        }
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('../views/Auth/ResetPassword.vue'),
        meta: {
            title: 'Reset Password'
        }
    },
    {
        path: '/verify-email',
        name: 'VerifyEmail',
        component: () => import('../views/Auth/VerifyEmail.vue'),
        meta: {
            title: 'Verify Email'
        }
    },

    // Dashboard Routes

    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
    },
    
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
        requiresAuth: true
      },
    },

    {
      path: '/account-settings',
      name: 'AccountSettings',
      component: () => import('../views/Others/AccountSettings.vue'),
      meta: {
        title: 'Account Settings',
        requiresAuth: true
      },
    },

    // Collection Routes

    {
      path: '/collections',
      name: 'Collections',
      component: () => import('../views/Collections/Collections.vue'),
      meta: {
        title: 'Collections',
        requiresAuth: true
      },
    },

    {
      path: '/refunds',
      name: 'Refunds',
      component: () => import('../views/Collections/Refunds.vue'),
      meta: {
        title: 'Refunds',
        requiresAuth: true
      },
    },

    // Disbursements Routes

    {
      path: '/disbursements',
      name: 'Disbursements',
      component: () => import('../views/Disbursements/Disbursements.vue'),
      meta: {
        title: 'Disbursements',
        requiresAuth: true
      },
    },

    {
      path: '/internal-transfers',
      name: 'InternalTransfer',
      component: () => import('../views/Disbursements/InternalTransfer.vue'),
      meta: {
        title: 'Internal Transfer',
        requiresAuth: true
      },
    },

    // Settlement Routes

    {
      path: '/settlements',
      name: 'Settlements',
      component: () => import('../views/Settlements/Settlements.vue'),
      meta: {
        title: 'Settlements',
        requiresAuth: true
      },
    },

    // Invoices Routes

    {
      path: '/invoices',
      name: 'Invoices',
      component: () => import('../views/Invoices/Invoices.vue'),
      meta: {
        title: 'Invoices',
        requiresAuth: true
      },
    },

    {
      path: '/invoice-payment',
      name: 'InvoicePayment',
      component: () => import('../views/Invoices/InvoicePayment.vue'),
      meta: {
        title: 'Invoice Payment',
      },
    },

    // User Routes

    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/Users/Users.vue'),
      meta: {
        title: 'Users',
        requiresAuth: true
      },
    },

    {
      path: '/roles',
      name: 'Roles',
      component: () => import('../views/Users/Roles.vue'),
      meta: {
        title: 'Roles',
        requiresAuth: true
      },
    },

    {
      path: '/activities',
      name: 'Audit Trail',
      component: () => import('../views/Others/UserActivities.vue'),
      meta: {
        title: 'Audit Trail',
        requiresAuth: true
      },
    },

    // Helper Routes

    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Others/BlankPage.vue'),
      meta: {
        title: 'Blank',
        requiresAuth: true
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/Errors/FourZeroFour.vue'),
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `NaPay ${to.meta.title}`
  
  const isAuthenticated = !!localStorage.getItem('np_access')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin')
  } else if ((to.path === '/signin' || to.path === '/signup' || to.path === '/otp') && isAuthenticated) {
     next('/')
  } else {
     next()
  }
})
