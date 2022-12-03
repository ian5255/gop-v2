<template lang="pug">
#Home
  p {{t('test')}}
  main
    TheWelcome
  //- <main>
  //-   <TheWelcome />
  //- </main>
</template>
<script setup>
import TheWelcome from '@/components/TheWelcome.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style scoped lang="scss">
#Home {
  color: red;
}
</style>
