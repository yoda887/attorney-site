<template>
  <div class="landing">
    <HeroSection />
    <SocialProofSection />
    <EmpathySection />
    <LegalQuizSection />
    <MultiStepForm />
    <ContactSection />
    <FinalCtaSection />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
// Components are auto-imported thanks to nuxt.config.ts configuration

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Адвокат Меркович Богдан Валерійович",
        "image": "https://merkovich.law/images/attorney-photo.png",
        "description": "Професійна юридична допомога: кримінальне, цивільне, господарське право, бізнес-спори.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Хрещатик, 1, офіс 305",
          "addressLocality": "Київ",
          "addressCountry": "UA"
        },
        "telephone": "+380501234567",
        "email": "info@merkovich.law",
        "url": "https://merkovich.law",
        "priceRange": "$$"
      })
    }
  ]
});
</script>
