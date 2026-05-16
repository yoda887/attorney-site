<template>
  <section class="section" id="appointment">
    <div class="container">
      <div class="text-center" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">{{ t('appointment.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('appointment.subtitle') }}</p>
      </div>
      <div class="appointment-wrapper">
        <div class="glass-card appointment-form-card">
          <form @submit.prevent="submitAppointment">
            <!-- Date Picker -->
            <div class="form-group">
              <label class="form-label">{{ t('appointment.date') }}</label>
              <input type="date" v-model="form.date" class="form-input" :min="minDate" @change="loadSlots" required />
            </div>

            <!-- Time Slots -->
            <div class="form-group" v-if="slots.length > 0">
              <label class="form-label">{{ t('appointment.time') }}</label>
              <div class="time-slots">
                <button
                  v-for="slot in slots"
                  :key="slot.time"
                  type="button"
                  class="time-slot"
                  :class="{ selected: form.timeSlot === slot.time, unavailable: !slot.available }"
                  :disabled="!slot.available"
                  @click="form.timeSlot = slot.time"
                >
                  {{ slot.time }}
                </button>
              </div>
            </div>

            <div v-if="form.date && slots.length === 0 && !slotsLoading" class="no-slots">
              {{ slotsMessage }}
            </div>

            <!-- Service -->
            <div class="form-group">
              <label class="form-label">{{ t('appointment.service') }}</label>
              <select v-model="form.service" class="form-input form-select" required>
                <option value="">{{ t('appointment.selectService') }}</option>
                <option v-for="s in services" :key="s.titleKey" :value="t(s.titleKey)">{{ t(s.titleKey) }}</option>
              </select>
            </div>

            <!-- Guest fields (if not logged in) -->
            <template v-if="!isAuthenticated">
              <div class="form-group">
                <label class="form-label">{{ t('appointment.name') }}</label>
                <input v-model="form.guestName" class="form-input" :placeholder="t('appointment.name')" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">{{ t('appointment.phone') }}</label>
                  <input v-model="form.guestPhone" type="tel" class="form-input" placeholder="+380..." required />
                </div>
                <div class="form-group">
                  <label class="form-label">{{ t('appointment.email') }}</label>
                  <input v-model="form.guestEmail" type="email" class="form-input" placeholder="email@example.com" />
                </div>
              </div>
            </template>

            <!-- Notes -->
            <div class="form-group">
              <label class="form-label">{{ t('appointment.notes') }}</label>
              <textarea v-model="form.notes" class="form-input form-textarea" :placeholder="t('appointment.notes')"></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%" :disabled="submitting">
              {{ submitting ? t('common.loading') : t('appointment.submit') }}
            </button>
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

const services = [
  { icon: '🔒', titleKey: 'services.criminal', descKey: 'services.criminal.desc' },
  { icon: '📋', titleKey: 'services.civil', descKey: 'services.civil.desc' },
  { icon: '👨‍👩‍👧', titleKey: 'services.family', descKey: 'services.family.desc' },
  { icon: '🏢', titleKey: 'services.business', descKey: 'services.business.desc' },
  { icon: '🏠', titleKey: 'services.realestate', descKey: 'services.realestate.desc' },
  { icon: '💬', titleKey: 'services.consultation', descKey: 'services.consultation.desc' },
];

const today = new Date();
const minDate = today.toISOString().split('T')[0];

const form = reactive({
  date: '',
  timeSlot: '',
  service: '',
  notes: '',
  guestName: '',
  guestPhone: '',
  guestEmail: '',
});

const slots = ref<{ time: string; available: boolean }[]>([]);
const slotsLoading = ref(false);
const slotsMessage = ref('');
const submitting = ref(false);

const loadSlots = async () => {
  if (!form.date) return;
  slotsLoading.value = true;
  form.timeSlot = '';
  try {
    const data: any = await $fetch(`/api/slots?date=${form.date}`);
    if (data.blocked) {
      slots.value = [];
      slotsMessage.value = t('appointment.blocked');
    } else if (data.dayOff) {
      slots.value = [];
      slotsMessage.value = t('appointment.dayOff');
    } else {
      slots.value = data.slots;
      if (data.slots.length === 0) slotsMessage.value = t('appointment.noSlots');
    }
  } catch (e) {
    slots.value = [];
    slotsMessage.value = t('common.error');
  } finally {
    slotsLoading.value = false;
  }
};

const submitAppointment = async () => {
  if (!form.date || !form.timeSlot || !form.service) return;
  submitting.value = true;
  try {
    const url = isAuthenticated.value ? '/api/appointments' : '/api/appointments/guest';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (isAuthenticated.value && accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }

    const body: any = {
      date: form.date,
      timeSlot: form.timeSlot,
      service: form.service,
      notes: form.notes || undefined,
    };

    if (!isAuthenticated.value) {
      body.guestName = form.guestName;
      body.guestPhone = form.guestPhone;
      body.guestEmail = form.guestEmail || undefined;
    }

    await $fetch(url, { method: 'POST', headers, body });
    toast.success(t('appointment.success'));

    // Reset form
    form.date = '';
    form.timeSlot = '';
    form.service = '';
    form.notes = '';
    form.guestName = '';
    form.guestPhone = '';
    form.guestEmail = '';
    slots.value = [];
  } catch (e: any) {
    toast.error(e?.data?.error || t('common.error'));
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.appointment-wrapper {
  max-width: 640px;
  margin: 0 auto;
}

.appointment-form-card {
  padding: var(--space-10);
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.time-slot {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.time-slot:hover:not(.unavailable) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.time-slot.selected {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.time-slot.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
  text-decoration: line-through;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.no-slots {
  padding: var(--space-4);
  background: rgba(231, 76, 94, 0.1);
  border: 1px solid rgba(231, 76, 94, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: var(--text-sm);
  text-align: center;
  margin-bottom: var(--space-5);
}

@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>
