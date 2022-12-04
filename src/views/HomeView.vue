<template lang="pug">
#Home
  p {{t('lang')}}
  main
    TheWelcome
  //- <main>
  //-   <TheWelcome />
  //- </main>
</template>
<script setup>
import TheWelcome from '@/components/TheWelcome.vue';
// import { useI18n } from 'vue-i18n';
const { t } = useI18n();
console.log(66789, t('lang'));
console.log(55555678, t('test'));
</script>
<style scoped lang="scss">
#Home {
  color: red;
}
</style>
