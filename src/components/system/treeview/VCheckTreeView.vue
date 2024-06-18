<template>
  <v-list class="menu_tree" open-strategy="multiple">
    <!-- 1Depth -->
    <div v-for="item in list" :key="item.key">
      <!-- 2Depth X -->
      <div v-if="!item.children" class="depth1">
        <v-list-item :key="item.key" prepend-icon="mdi-folder-multiple" :title="item.text">
          <div class="d-flex mr-8">
            <v-checkbox label="읽기" v-model="item.readPerm"></v-checkbox>
            <v-checkbox label="쓰기" v-model="item.writePerm"></v-checkbox>
            <v-checkbox label="다운" v-model="item.downPerm"></v-checkbox>
          </div>
        </v-list-item>
      </div>

      <!-- 2Depth O -->
      <v-list-group v-else>
        <template v-slot:activator="{ props }">
          <div class="depth1">
            <v-list-item v-bind="props" prepend-icon="mdi-folder-multiple" :title="item.text"></v-list-item>
          </div>
        </template>

        <!-- 2Depth -->
        <div v-for="secondItem in item.children" :key="secondItem.key">
          <!-- 3Depth X -->
          <div v-if="!secondItem.children" class="depth2">
            <v-list-item :key="secondItem.key" prepend-icon="mdi-folder-multiple-outline" :title="secondItem.text">
              <div class="d-flex mr-8">
                <v-checkbox label="읽기" v-model="secondItem.readPerm"></v-checkbox>
                <v-checkbox label="쓰기" v-model="secondItem.writePerm"></v-checkbox>
                <v-checkbox label="다운" v-model="secondItem.downPerm"></v-checkbox>
              </div>
            </v-list-item>
          </div>

          <!-- 3Depth O -->
          <v-list-group v-else>
            <template v-slot:activator="{ props }">
              <div class="depth2">
                <v-list-item
                  v-bind="props"
                  :title="secondItem.text"
                  prepend-icon="mdi-folder-multiple-outline"
                ></v-list-item>
              </div>
            </template>

            <!-- 3Depth -->
            <div class="depth3" v-for="thirdItem in secondItem.children" :key="thirdItem.key">
              <v-list-item prepend-icon="mdi-folder-outline" :title="thirdItem.text">
                <div class="d-flex mr-8">
                  <v-checkbox label="읽기" v-model="thirdItem.readPerm"></v-checkbox>
                  <v-checkbox label="쓰기" v-model="thirdItem.writePerm"></v-checkbox>
                  <v-checkbox label="다운" v-model="thirdItem.downPerm"></v-checkbox>
                </div>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list-group>
    </div>
  </v-list>
</template>

<script setup>
import "@/scss/components/_VTreeView.scss";
const list = defineModel();
</script>
