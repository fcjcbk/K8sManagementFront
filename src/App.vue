<template>
    <a-layout has-sider>
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <video-camera-outlined />
                    <span class="nav-text"><router-link to="/pods">Pods</router-link></span>
                </a-menu-item>
                <a-menu-item key="2">
                    <appstore-outlined />
                    <span class="nav-text"><router-link to="/createpod">CreatePod</router-link></span>
                </a-menu-item>
                <a-menu-item key="3">
                    <team-outlined />
                    <span class="nav-text"><router-link to="/nodes">Nodes</router-link></span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: '200px', height: '100vh' }">
            <a-layout-header :style="{ background: '#fff', padding: 0 }" />
            <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item> {{ selectedKeys }} </a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
                    <!-- content -->
                    <RouterView> </RouterView>

                </div>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">
                岗位实践作业 ©2023 Created by 谢晓锋 2021280087
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const selectedKeys = ref(['1']);
</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>