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
import { SetHash, GetHash, keys } from '@/plugins/localstorage';
import { useCounterStore } from '@/stores/counter';

// i18n example
const { t, locale } = useI18n();
setTimeout(() => {
  SetHash(keys.locale, 'en-US');
  locale.value = GetHash(keys.locale);
}, 3000);

// Pinia store example
const counterStore = useCounterStore();
counterStore.increment();
counterStore.increment();
counterStore.increment();
setTimeout(() => {
  console.log('counterStore', counterStore.counter);
}, 3000);
</script>
<style scoped lang="scss">
#Home {
  color: red;
}
</style>
