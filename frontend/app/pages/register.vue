<template>
  <div class="auth-page">
    <div class="auth-card glass-card">
      <div class="auth-header">
        <NuxtLink to="/" class="auth-logo">⚖️</NuxtLink>
        <h1>{{ isLogin ? t('auth.login') : t('auth.register') }}</h1>
      </div>

      <form @submit.prevent="handleSubmit">
        <template v-if="!isLogin">
          <div class="form-group">
            <label class="form-label">{{ t('auth.fullName') }}</label>
            <input v-model="form.fullName" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">{{ t('auth.phone') }}</label>
            <input v-model="form.phone" type="tel" class="form-input" placeholder="+380..." />
          </div>
        </template>

        <div class="form-group">
          <label class="form-label">{{ t('auth.email') }}</label>
          <input v-model="form.email" type="email" class="form-input" required />
        </div>

        <div class="form-group">
          <label class="form-label">{{ t('auth.password') }}</label>
          <input v-model="form.password" type="password" class="form-input" minlength="6" required />
        </div>

        <div v-if="errorMsg" class="form-error" style="margin-bottom: var(--space-4)">{{ errorMsg }}</div>

        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%" :disabled="loading">
          {{ loading ? t('common.loading') : (isLogin ? t('auth.loginBtn') : t('auth.registerBtn')) }}
        </button>
      </form>

      <div class="auth-switch">
        <template v-if="isLogin">
          {{ t('auth.noAccount') }}
          <NuxtLink to="/register">{{ t('auth.register') }}</NuxtLink>
        </template>
        <template v-else>
          {{ t('auth.hasAccount') }}
          <NuxtLink to="/login">{{ t('auth.login') }}</NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const { login, register, loading, isAuthenticated } = useAuth();
const toast = useToast();

const isLogin = computed(() => route.path === '/login');

const form = reactive({
  email: '',
  password: '',
  fullName: '',
  phone: '',
});

const errorMsg = ref('');

// Redirect if already logged in
watch(isAuthenticated, (val) => {
  if (val) navigateTo('/dashboard');
}, { immediate: true });

const handleSubmit = async () => {
  errorMsg.value = '';
  try {
    if (isLogin.value) {
      await login(form.email, form.password);
    } else {
      await register(form.email, form.password, form.fullName, form.phone || undefined);
    }
    toast.success(isLogin.value ? 'Успішний вхід!' : 'Реєстрація успішна!');
    navigateTo('/dashboard');
  } catch (e: any) {
    errorMsg.value = e?.data?.error || t('common.error');
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: var(--color-bg-primary);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: var(--space-10);
}

.auth-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.auth-logo {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-4);
  text-decoration: none;
}

.auth-header h1 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
}

.auth-switch {
  text-align: center;
  margin-top: var(--space-6);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.auth-switch a {
  color: var(--color-accent);
  font-weight: 500;
}
</style>
