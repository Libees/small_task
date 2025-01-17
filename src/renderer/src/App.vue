<template>
  <el-config-provider :locale="zhCn">
    <div>
      <Index></Index>
    </div>
  </el-config-provider>
</template>

<script setup>
import Index from './index/index.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
