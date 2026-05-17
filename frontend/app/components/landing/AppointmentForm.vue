<template>
  <section class="section" id="appointment">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-12)">
        <h2 class="section-title">{{ t('appointment.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('appointment.subtitle') }}</p>
      </div>
      <div class="appointment-wrapper reveal delay-2">
        <div class="glass-card appointment-form-card">
          <form @submit.prevent="submitAppointment">
            <!-- Custom Calendar -->
            <div class="form-group">
              <label class="form-label">{{ t('appointment.date') }}</label>
              <div class="calendar">
                <div class="calendar-header">
                  <button type="button" class="calendar-nav" @click="prevMonth">‹</button>
                  <span class="calendar-month">{{ currentMonthName }} {{ currentYear }}</span>
                  <button type="button" class="calendar-nav" @click="nextMonth">›</button>
                </div>
                <div class="calendar-weekdays">
                  <span v-for="day in weekDays" :key="day">{{ day }}</span>
                </div>
                <div class="calendar-grid">
                  <button
                    v-for="(cell, i) in calendarCells"
                    :key="i"
                    type="button"
                    class="calendar-day"
                    :class="{
                      'other-month': !cell.currentMonth,
                      'today': cell.isToday,
                      'selected': cell.dateStr === form.date,
                      'disabled': cell.isPast || !cell.currentMonth,
                    }"
                    :disabled="cell.isPast || !cell.currentMonth"
                    @click="selectDate(cell)"
                  >
                    {{ cell.day }}
                  </button>
                </div>
              </div>
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

useReveal();

const services = [
  { icon: '🔒', titleKey: 'services.criminal', descKey: 'services.criminal.desc' },
  { icon: '📋', titleKey: 'services.civil', descKey: 'services.civil.desc' },
  { icon: '👨‍👩‍👧', titleKey: 'services.family', descKey: 'services.family.desc' },
  { icon: '🏢', titleKey: 'services.business', descKey: 'services.business.desc' },
  { icon: '🏠', titleKey: 'services.realestate', descKey: 'services.realestate.desc' },
  { icon: '💬', titleKey: 'services.consultation', descKey: 'services.consultation.desc' },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

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

// Calendar state
const viewDate = ref(new Date());
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

const monthNames = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];

const currentYear = computed(() => viewDate.value.getFullYear());
const currentMonthName = computed(() => monthNames[viewDate.value.getMonth()]);

const prevMonth = () => {
  const d = new Date(viewDate.value);
  d.setMonth(d.getMonth() - 1);
  viewDate.value = d;
};

const nextMonth = () => {
  const d = new Date(viewDate.value);
  d.setMonth(d.getMonth() + 1);
  viewDate.value = d;
};

interface CalendarCell {
  day: number;
  dateStr: string;
  currentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

const calendarCells = computed((): CalendarCell[] => {
  const year = viewDate.value.getFullYear();
  const month = viewDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday = 0, Sunday = 6
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const cells: CalendarCell[] = [];

  // Previous month fill
  const prevLastDay = new Date(year, month, 0);
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevLastDay.getDate() - i;
    cells.push({
      day: d,
      dateStr: '',
      currentMonth: false,
      isToday: false,
      isPast: true,
    });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({
      day: d,
      dateStr,
      currentMonth: true,
      isToday: date.getTime() === today.getTime(),
      isPast: date < today,
    });
  }

  // Next month fill
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({
      day: d,
      dateStr: '',
      currentMonth: false,
      isToday: false,
      isPast: false,
    });
  }

  return cells;
});

const selectDate = (cell: CalendarCell) => {
  if (cell.isPast || !cell.currentMonth) return;
  form.date = cell.dateStr;
  loadSlots();
};

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

/* Custom Calendar */
.calendar {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-bottom: var(--space-2);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.calendar-month {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.calendar-nav {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.calendar-nav:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: var(--space-2);
}

.calendar-weekdays span {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-2) 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.calendar-day:hover:not(.disabled):not(.other-month) {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.calendar-day.other-month {
  color: var(--color-text-muted);
  opacity: 0.3;
  cursor: default;
}

.calendar-day.disabled {
  color: var(--color-text-muted);
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-day.today {
  border-color: var(--color-border-accent);
  color: var(--color-accent);
}

.calendar-day.selected {
  background: var(--color-accent);
  color: var(--color-bg-primary);
  border-color: var(--color-accent);
  font-weight: 600;
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
