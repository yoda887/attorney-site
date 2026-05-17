<template>
  <div class="landing">
    <HeroSection />
    <SectionDivider />
    <ServicesSection />
    <SectionDivider />
    <AboutSection />
    <SectionDivider />
    <HowItWorksSection />
    <SectionDivider />
    <AppointmentForm />
    <SectionDivider />
    <TestimonialsSection />
    <SectionDivider />
    <ContactSection />
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
        "image": "https://merkovich.law/images/avatar.jpg",
        "description": "Професійна юридична допомога: кримінальне, цивільне, господарське право, бізнес-спори.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "вул. Юридична, 1",
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
