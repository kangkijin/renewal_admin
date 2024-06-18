<template>
  <v-expansion-panels class="sr_info">
    <v-expansion-panel elevation="0" class="rounded-5">
      <v-expansion-panel-title
        collapse-icon="mdi-menu-down"
        expand-icon="mdi-cursor-default-click"
        class="font-weight-medium bg-lightprimary text-primary"
      >
        <v-icon icon="mdi-face-agent" class="mr-2"></v-icon>
        <span class="sr_title">SR서비스 정보</span>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list class="pa-0 bg-white100">
          <v-list-item>
            <a href="http://sr.dainls.com" target="_blank">
              <v-btn size="small" color="primary" width="100%">SR사이트 바로가기</v-btn>
            </a>
          </v-list-item>
          <v-list-item>
            담당자:<br />
            운영팀 팀장 이규헌
          </v-list-item>
          <v-list-item>
            전화:<br />
            02&#41; 514-2060
          </v-list-item>
          <v-list-item>
            이메일:<br />
            khlee@dainls.com
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
