<template>
  <section class="section quiz-section" id="quiz" role="region" aria-labelledby="quiz-title">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: var(--space-12)">
        <h2 class="section-title" id="quiz-title">{{ t('quiz.title') }}</h2>
        <p class="section-subtitle" style="margin: 0 auto">{{ t('quiz.subtitle') }}</p>
      </div>
      <div class="quiz-wrapper reveal delay-1">
        <div class="quiz-card" v-if="!isCompleted">
          <div class="quiz-progress" aria-label="Прогрес квізу">
            <svg class="progress-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle class="progress-ring__bg" cx="50" cy="50" r="45" />
              <circle class="progress-ring__fill" cx="50" cy="50" r="45" :style="{ strokeDashoffset: progressOffset }" />
            </svg>
            <div class="progress-text">
              <span class="progress-current">{{ currentStep + 1 }}</span>
              <span class="progress-sep">/</span>
              <span class="progress-total">{{ questions.length }}</span>
            </div>
          </div>
          <Transition :name="transitionName" mode="out-in">
            <div :key="currentStep" class="quiz-question">
              <h3 class="quiz-q-text">{{ t(questions[currentStep].qKey) }}</h3>
              <div class="quiz-options" role="radiogroup">
                <button v-for="(opt, oi) in questions[currentStep].opts" :key="oi"
                  class="quiz-option" :class="{ selected: answers[currentStep] === oi }"
                  @click="answers[currentStep] = oi" role="radio" :aria-checked="answers[currentStep] === oi">
                  <span class="opt-radio"><span class="opt-dot"></span></span>
                  {{ t(opt) }}
                </button>
              </div>
            </div>
          </Transition>
          <div class="quiz-nav">
            <button v-if="currentStep > 0" class="btn btn-ghost" @click="transitionName='slide-right'; currentStep--">← {{ t('quiz.back') }}</button>
            <div v-else></div>
            <button v-if="currentStep < questions.length - 1" class="btn btn-primary" :disabled="answers[currentStep]===null" @click="transitionName='slide-left'; currentStep++">{{ t('quiz.next') }} →</button>
            <button v-else class="btn btn-primary" :disabled="answers[currentStep]===null" @click="finishQuiz">{{ t('quiz.finish') }} ✓</button>
          </div>
        </div>
        <div v-else-if="!leadSubmitted" class="quiz-result animate-fade-in-up">
          <div class="qr-icon">🎯</div>
          <h3 class="qr-title">{{ t('quiz.result.title') }}</h3>
          <p class="qr-text">{{ t('quiz.result.text') }}</p>
          <form @submit.prevent="submitQuizLead" class="quiz-lead-form">
            <div class="form-group" style="margin-bottom: 0;">
              <input v-model="quizForm.name" class="form-input" :placeholder="t('multistep.name') + ' *'" required autocomplete="name" />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <input v-model="quizForm.phone" type="tel" class="form-input" placeholder="+380..." required autocomplete="tel" />
            </div>
            <button type="submit" class="btn btn-primary btn-lg quiz-submit-btn" :disabled="submitting">
              {{ submitting ? t('common.loading') : t('quiz.result.cta') }}
            </button>
          </form>
        </div>
        <div v-else class="quiz-result animate-fade-in-up">
           <div class="qr-icon">✅</div>
           <h3 class="qr-title">{{ t('multistep.success') }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useReveal();
const { trigger: triggerConfetti } = useConfetti();
const { isAuthenticated, accessToken } = useAuth();
const toast = useToast();
const { quizSelectedService } = useLeadState();

const questions = [
  { qKey: 'quiz.q1', opts: ['quiz.q1.a1','quiz.q1.a2','quiz.q1.a3','quiz.q1.a4','quiz.q1.a5'] },
  { qKey: 'quiz.q2', opts: ['quiz.q2.a1','quiz.q2.a2','quiz.q2.a3'] },
  { qKey: 'quiz.q3', opts: ['quiz.q3.a1','quiz.q3.a2','quiz.q3.a3'] },
  { qKey: 'quiz.q4', opts: ['quiz.q4.a1','quiz.q4.a2','quiz.q4.a3','quiz.q4.a4'] },
  { qKey: 'quiz.q5', opts: ['quiz.q5.a1','quiz.q5.a2','quiz.q5.a3','quiz.q5.a4'] },
];

const currentStep = ref(0);
const answers = ref<(number|null)[]>(questions.map(() => null));
const isCompleted = ref(false);
const leadSubmitted = ref(false);
const submitting = ref(false);
const quizForm = reactive({ name: '', phone: '' });

// Map Q1 answers to service translation keys
const serviceMap = [
  'services.criminal',
  'services.civil',
  'services.family',
  'services.business',
  'services.realestate'
];

watch(() => answers.value[0], (newVal) => {
  if (newVal !== null && newVal < serviceMap.length) {
    quizSelectedService.value = serviceMap[newVal];
  }
});

const finishQuiz = () => { isCompleted.value = true; };

const submitQuizLead = async () => {
  submitting.value = true;
  try {
    const url = isAuthenticated.value ? '/api/appointments' : '/api/appointments/guest';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (isAuthenticated.value && accessToken.value) headers['Authorization'] = `Bearer ${accessToken.value}`;
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    
    const notes = questions.map((q, i) => `${t(q.qKey)}: ${answers.value[i] !== null ? t(q.opts[answers.value[i] as number]) : '-'}`).join('\n');

    const body: any = {
      date: dateStr, 
      timeSlot: '09:00',
      service: quizSelectedService.value ? t(quizSelectedService.value) : 'Консультація (Квіз)', 
      notes: "Лід з Квізу:\n" + notes,
    };
    if (!isAuthenticated.value) { body.guestName = quizForm.name; body.guestPhone = quizForm.phone; }
    
    await $fetch(url, { method: 'POST', headers, body });
    
    leadSubmitted.value = true;
    triggerConfetti();
  } catch (e: any) {
    toast.error(e?.data?.error || t('common.error'));
  } finally {
    submitting.value = false;
  }
};

const transitionName = ref('slide-left');
const circumference = 2 * Math.PI * 45;
const progressOffset = computed(() => circumference * (1 - (currentStep.value + 1) / questions.length));
</script>

<style scoped>
.quiz-section { background: var(--color-bg-secondary); }
.quiz-wrapper { max-width: 640px; margin: 0 auto; }
.quiz-card { background: var(--color-bg-card); border: 1px solid var(--color-border-light); border-radius: var(--radius-xl); padding: var(--space-10); box-shadow: var(--shadow-lg); display: flex; flex-direction: column; align-items: center; }
.quiz-progress { position: relative; width: 90px; height: 90px; margin-bottom: var(--space-8); }
.progress-ring { width: 100%; height: 100%; transform: rotate(-90deg); }
.progress-ring__bg { fill: none; stroke: var(--color-border); stroke-width: 4; }
.progress-ring__fill { fill: none; stroke: var(--color-accent); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 283; transition: stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1); }
.progress-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; color: var(--color-navy); }
.progress-sep { color: var(--color-text-muted); margin: 0 2px; font-weight: 400; }
.progress-total { color: var(--color-text-muted); font-weight: 400; }
.quiz-question { width: 100%; margin-bottom: var(--space-8); overflow: hidden; }
.quiz-q-text { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 600; color: var(--color-navy); text-align: center; margin-bottom: var(--space-6); line-height: 1.3; }
.quiz-options { display: flex; flex-direction: column; gap: var(--space-3); }
.quiz-option { display: flex; align-items: center; gap: var(--space-3); width: 100%; padding: var(--space-4) var(--space-5); border: 2px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-primary); color: var(--color-text-secondary); font-size: var(--text-base); font-weight: 500; text-align: left; cursor: pointer; transition: border-color var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast); }
.quiz-option:hover { border-color: var(--color-accent); color: var(--color-navy); background: var(--color-accent-bg); }
.quiz-option.selected { border-color: var(--color-accent); background: var(--color-accent-bg); color: var(--color-navy); font-weight: 600; }
.opt-radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--color-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color var(--transition-fast), background-color var(--transition-fast); }
.quiz-option.selected .opt-radio { border-color: var(--color-accent); background: var(--color-accent); }
.opt-dot { width: 8px; height: 8px; border-radius: 50%; background: transparent; transition: background var(--transition-fast); }
.quiz-option.selected .opt-dot { background: white; }
.quiz-nav { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s cubic-bezier(0.16,1,0.3,1); }
.slide-left-enter-from { opacity: 0; transform: translateX(40px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-40px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-40px); }
.slide-right-leave-to { opacity: 0; transform: translateX(40px); }
.quiz-result { background: var(--color-navy); border-radius: var(--radius-xl); padding: var(--space-12); text-align: center; box-shadow: var(--shadow-xl); }
.qr-icon { font-size: 3rem; margin-bottom: var(--space-4); }
.qr-title { font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 700; color: var(--color-text-inverse); margin-bottom: var(--space-4); }
.qr-text { font-size: var(--text-lg); color: var(--color-text-on-navy); max-width: 480px; margin: 0 auto var(--space-8); line-height: 1.7; }
@media (max-width: 768px) { .quiz-card { padding: var(--space-6); } .quiz-q-text { font-size: var(--text-xl); } .quiz-option { padding: var(--space-3) var(--space-4); font-size: var(--text-sm); } }
.quiz-lead-form { max-width: 320px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-4); }
.quiz-submit-btn { width: 100%; margin-top: var(--space-2); }
</style>
