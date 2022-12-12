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
import { SetHash, GetHash, keys } from '@/plugins/localstorage';

console.log(555, useI18n());
const { t, locale } = useI18n();
const aa = encrypt(t('lang'));
console.log(66789, t('lang'), aa);
console.log(55555678, t('test'), decrypt(aa));
setTimeout(() => {
  SetHash(keys.locale, 'en-US');
  locale.value = GetHash(keys.locale);
}, 3000);
</script>
<style scoped lang="scss">
#Home {
  color: red;
}
</style>
