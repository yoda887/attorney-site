<template>
  <section class="section" id="appointment" role="region" aria-labelledby="form-title">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-12)">
        <h2 class="section-title" id="form-title">{{ t('multistep.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('multistep.subtitle') }}</p>
      </div>
      <div class="msf-wrapper reveal delay-1">
        <!-- Step indicator -->
        <div class="msf-steps" role="navigation" aria-label="Кроки форми">
          <div v-for="(s, i) in stepLabels" :key="i" class="msf-step" :class="{ active: step >= i, current: step === i }">
            <div class="msf-step-num">{{ step > i ? '✓' : i + 1 }}</div>
            <span class="msf-step-label">{{ t(s) }}</span>
          </div>
          <div class="msf-step-line" :style="{ width: `${(step / (stepLabels.length - 1)) * 100}%` }"></div>
        </div>
        <!-- Form card -->
        <div class="msf-card">
          <form @submit.prevent="handleSubmit">
            <!-- Step 1: Contact -->
            <Transition name="msf-slide" mode="out-in">
              <div v-if="step === 0" key="s1" class="msf-body">
                <div class="form-group">
                  <label class="form-label" for="msf-name">{{ t('multistep.name') }} *</label>
                  <input id="msf-name" v-model="form.name" class="form-input" required autocomplete="name" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="msf-phone">{{ t('multistep.phone') }} *</label>
                  <input id="msf-phone" v-model="form.phone" type="tel" class="form-input" placeholder="+380..." required autocomplete="tel" />
                </div>
              </div>
              <!-- Step 2: Situation -->
              <div v-else-if="step === 1" key="s2" class="msf-body">
                <div class="form-group">
                  <label class="form-label" for="msf-service">{{ t('multistep.service') }}</label>
                  <select id="msf-service" v-model="form.service" class="form-input form-select">
                    <option value="">{{ t('multistep.selectService') }}</option>
                    <option v-for="s in services" :key="s" :value="t(s)">{{ t(s) }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="msf-notes">{{ t('multistep.notes') }}</label>
                  <textarea id="msf-notes" v-model="form.notes" class="form-input form-textarea" rows="3"></textarea>
                </div>
              </div>
              <!-- Step 3: Confirm -->
              <div v-else key="s3" class="msf-body">
                <div class="form-group">
                  <label class="form-label">{{ t('multistep.callTime') }}</label>
                  <div class="call-time-options">
                    <button v-for="(ct, ci) in callTimes" :key="ci" type="button" class="call-time-btn" :class="{ selected: form.callTime === ci }" @click="form.callTime = ci">
                      {{ t(ct) }}
                    </button>
                  </div>
                </div>
                <label class="consent-label">
                  <input type="checkbox" v-model="form.consent" class="consent-checkbox" required />
                  <span>{{ t('multistep.consent') }}</span>
                </label>
                <div class="msf-guarantees">
                  <p>{{ t('multistep.privacy') }}</p>
                  <p>{{ t('multistep.response') }}</p>
                </div>
              </div>
            </Transition>
            <!-- Nav buttons -->
            <div class="msf-nav">
              <button v-if="step > 0" type="button" class="btn btn-ghost" @click="step--">← {{ t('multistep.back') }}</button>
              <div v-else></div>
              <button v-if="step < 2" type="button" class="btn btn-primary" :disabled="!canNext" @click="step++">{{ t('multistep.next') }} →</button>
              <button v-else type="submit" class="btn btn-primary btn-lg" :disabled="submitting || !form.consent">
                {{ submitting ? t('common.loading') : t('multistep.submit') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { isAuthenticated, accessToken } = useAuth();
const toast = useToast();
useReveal();

const step = ref(0);
const submitting = ref(false);
const stepLabels = ['multistep.step1', 'multistep.step2', 'multistep.step3'];
const services = ['services.criminal','services.civil','services.family','services.business','services.realestate','services.consultation'];
const callTimes = ['multistep.callTime.morning','multistep.callTime.afternoon','multistep.callTime.evening'];

const form = reactive({
  name: '', phone: '', service: '', notes: '', callTime: 0 as number, consent: false,
});

const canNext = computed(() => {
  if (step.value === 0) return form.name.trim() !== '' && form.phone.trim() !== '';
  return true;
});

const handleSubmit = async () => {
  if (!form.consent) return;
  submitting.value = true;
  try {
    const url = isAuthenticated.value ? '/api/appointments' : '/api/appointments/guest';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (isAuthenticated.value && accessToken.value) headers['Authorization'] = `Bearer ${accessToken.value}`;
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const body: any = {
      date: dateStr, timeSlot: ['09:00','12:00','16:00'][form.callTime],
      service: form.service || 'Консультація', notes: form.notes || undefined,
    };
    if (!isAuthenticated.value) { body.guestName = form.name; body.guestPhone = form.phone; }
    await $fetch(url, { method: 'POST', headers, body });
    toast.success(t('multistep.success'));
    form.name = ''; form.phone = ''; form.service = ''; form.notes = ''; form.callTime = 0; form.consent = false;
    step.value = 0;
  } catch (e: any) {
    toast.error(e?.data?.error || t('common.error'));
  } finally { submitting.value = false; }
};
</script>

<style scoped>
.msf-wrapper { max-width: 580px; margin: 0 auto; }
.msf-steps { display: flex; justify-content: space-between; align-items: flex-start; position: relative; margin-bottom: var(--space-8); padding: 0 var(--space-4); }
.msf-step { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); z-index: 1; }
.msf-step-num { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: var(--text-sm); background: var(--color-bg-secondary); color: var(--color-text-muted); border: 2px solid var(--color-border); transition: all var(--transition-base); }
.msf-step.active .msf-step-num { background: var(--color-accent); color: white; border-color: var(--color-accent); }
.msf-step.current .msf-step-num { box-shadow: 0 0 0 4px var(--color-accent-glow); }
.msf-step-label { font-size: var(--text-xs); font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.msf-step.active .msf-step-label { color: var(--color-navy); }
.msf-step-line { position: absolute; top: 20px; left: 40px; right: 40px; height: 2px; background: var(--color-accent); z-index: 0; transition: width 0.5s ease; transform-origin: left; }
.msf-steps::before { content: ''; position: absolute; top: 20px; left: 40px; right: 40px; height: 2px; background: var(--color-border); z-index: 0; }
.msf-card { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); padding: var(--space-8); box-shadow: var(--shadow-lg); }
.msf-body { min-height: 200px; }
.msf-nav { display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-6); padding-top: var(--space-6); border-top: 1px solid var(--color-border-light); }
.call-time-options { display: flex; flex-direction: column; gap: var(--space-2); }
.call-time-btn { padding: var(--space-3) var(--space-4); border: 2px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-primary); color: var(--color-text-secondary); font-size: var(--text-sm); cursor: pointer; transition: all var(--transition-fast); text-align: left; }
.call-time-btn:hover { border-color: var(--color-accent); }
.call-time-btn.selected { border-color: var(--color-accent); background: var(--color-accent-bg); color: var(--color-navy); font-weight: 600; }
.consent-label { display: flex; align-items: flex-start; gap: var(--space-3); margin: var(--space-5) 0; font-size: var(--text-sm); color: var(--color-text-secondary); cursor: pointer; }
.consent-checkbox { width: 18px; height: 18px; accent-color: var(--color-accent); flex-shrink: 0; margin-top: 2px; }
.msf-guarantees { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); background: var(--color-bg-secondary); border-radius: var(--radius-md); }
.msf-guarantees p { font-size: var(--text-sm); color: var(--color-text-secondary); }
.msf-slide-enter-active, .msf-slide-leave-active { transition: all 0.3s ease; }
.msf-slide-enter-from { opacity: 0; transform: translateX(20px); }
.msf-slide-leave-to { opacity: 0; transform: translateX(-20px); }
@media (max-width: 768px) { .msf-card { padding: var(--space-5); } .msf-step-label { font-size: 0.65rem; } }
</style>
