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
import { encrypt, decrypt } from '@/plugins/cryptoJs';
import TheWelcome from '@/components/TheWelcome.vue';
// import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const aa = encrypt(t('lang'));
console.log(66789, t('lang'), aa);
console.log(55555678, t('test'), decrypt(aa));
</script>
<style scoped lang="scss">
#Home {
  color: red;
}
</style>
