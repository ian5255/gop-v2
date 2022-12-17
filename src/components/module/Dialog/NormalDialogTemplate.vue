<template lang="pug">
#NormalDialogTemplate(v-if="config" :class="{'fade':isLeave.value}")
  .mask(@click="MaskClick" :class="{'fade':isLeave.value}")
  .content(
    :class="{'leave':isLeave.value}"
    :style="styleObj"
  )
    .text-area(:style="{'text-align':config.textAlign}")
      .area
        p(v-for="(text,index) in config.texts" :key="index") {{text}}
      .area
        .small(v-for="(text2,index2) in config.smallText" :key="0+index2") {{text2}}
      .area
        .notice(v-for="(text3,index3) in config.notices" :key="0+index3") {{text3}}
    .btn-area
      //- TyrButton.btn-style(
      //-   v-if="config.showCancel"
      //-   :type="config.cancelType"
      //-   @on-click="CancelClick"
      //- ) {{config.cancelText}}
      //- TyrButton.btn-style(
      //-   v-if="config.showOk"
      //-   :type="config.okType"
      //-   @on-click="OkClick"
      //- ) {{config.okText}}
</template>

<script setup>
const isLeave = ref(false);
const props = defineProps({
  config: Object
});
const styleObj = computed(() => {
  return {
    width: props.config.width || '400px',
    height: props.config.height || 'auto'
  };
});

const MaskClick = () => {
  if (!props.config.maskClose) return;
  if (isLeave.value) return;
  isLeave.value = true;
  setTimeout(() => {
    defineEmits('Close');
  }, 300);
};
// const OkClick = () => {
//   if (isLeave.value) return;
//   isLeave.value = true;
//   setTimeout(() => {
//     defineEmits('Ok');
//   }, 300);
// };
// const CancelClick = () => {
//   if (isLeave.value) return;
//   isLeave.value = true;
//   setTimeout(() => {
//     defineEmits('Cancel');
//   }, 300);
// };
</script>
<style lang="scss" scoped>
// 淡入
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes open {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

#Dialog {
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: 0.2s appear;
  display: flex;
  align-items: center;
  justify-content: center;
  .mask {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: rgba(55, 55, 55, 0.6);
  }
  .content {
    min-width: 100px;
    min-height: 50px;
    margin-left: 250px;
    margin-bottom: 150px;
    position: relative;
    z-index: 1;
    padding: 16px;
    outline: 0;
    background: #fff;
    border-radius: 6px;
    border: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: 0.2s open;
    .text-area {
      font-weight: 500;
      color: #3e3a39;
      padding: 20px;
      font-size: 16px;
      letter-spacing: 2px;
      p {
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .area {
        margin-bottom: 10px;
      }
      .small {
        font-size: 12px;
        color: #9a9a9a;
      }
      .notice {
        font-size: 14px;
        color: #CA5940;
      }
    }
    .btn-area {
      display: flex;
      justify-content: center;
      > .btn-style:not(:first-child) {
        margin-left: 10px;
      }
    }
    .isSmallSpacing {
      letter-spacing: 0.15em;
    }
  }
  .fade {
    transition: all 0.2s linear;
    opacity: 0;
  }
  .leave {
    transition: all 0.2s linear;
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
