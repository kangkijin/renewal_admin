<template>
  <v-card class="bg-lightblue elevation-0 rounded-md mb-8">
    <div class="px-8 py-8 py-lg-0">
      <div class="d-flex justify-space-between">
        <div class="d-flex py-0 align-center">
          <div>
            <h3 class="text-h3 mb-6">{{ title }}</h3>
            <v-breadcrumbs :items="breadcrumbs" class="font-weight-medium pa-0 ml-n1">
              <template v-slot:divider>
                <div class="d-flex align-center">
                  <img src="@/assets/images/base/icon_right_gray.svg" alt="navigation" />
                </div>
              </template>
              <template v-slot:title="{ item }">
                <h6 class="text-medium-emphasis text-subtitle-1">{{ item.title }}</h6>
              </template>
            </v-breadcrumbs>
          </div>
        </div>
        <div class="d-none py-0 d-lg-block overflow-hidden" style="position: relative; right: 100px; z-index: -1">
          <div class="mt-5 mb-n1">
            <img src="@/assets/images/base/bg_navi.svg" alt="breadcrumb" />
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  breadcrumbs: Array,
  icon: String,
});
</script>
