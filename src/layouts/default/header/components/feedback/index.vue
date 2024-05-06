<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate"> 反馈 </span>
      </span>
    </span>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem v-if="getUseLockPage" key="problem" text="问题反馈" icon="ri:feedback-line" />
        <MenuItem key="optimize" text="优化建议" icon="ep:promotion" />
      </Menu>
    </template>
  </Dropdown>
  <OptimizeModal @register="registerOpiModal" />
  <ProblemModal @register="registerProModal" />
</template>
<script lang="ts" setup>
  import { Dropdown, Menu } from 'ant-design-vue';
  import MenuItem from './DropMenuItem.vue';
  import { useModal } from '/@/components/Modal';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import OptimizeModal from './optimizeModal.vue';
  import ProblemModal from './problemModal.vue';

  const [registerOpiModal, { openModal: openOpiModal }] = useModal();
  const [registerProModal, { openModal: openProModal }] = useModal();
  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });
  type MenuEvent = 'problem' | 'optimize';
  const { prefixCls } = useDesign('header-user-dropdown');
  const { getUseLockPage } = useHeaderSetting();

  const handleMenuClick = (e: { key: MenuEvent }) => {
    switch (e.key) {
      case 'problem':
        openProModal(true);
        break;
      case 'optimize':
        openOpiModal(true);
        break;
    }
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
