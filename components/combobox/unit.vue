<template>
  <div class="flex items-end gap-4">
    <div class="">
      <div
        class="bg-primary text-white w-full flex items-center p-2 hover:cursor-pointer"
        @click="openCombobox = !openCombobox"
      >
        {{ selectedUnit ? selectedUnit : "Unit" }}

        <Icon icon="mdi:chevron-down" class="w-5 h-5" />
      </div>
      <div
        v-show="openCombobox"
        class="absolute shadow-lg min-w-fit max-h-40 overflow-y-scroll"
      >
        <div
          v-for="(unit, index) in units"
          :key="unit"
          class="p-3 hover:cursor-pointer hover:bg-primary/20"
          @click="handleSelect(index)"
        >
          {{ unit.unit_name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import query from "~/composables/Query";
import getMeasurementUnits from "~/graphql/queries/getMeasurementUnits.gql";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const units = ref([]);
const openCombobox = ref(false);
const { onResult, loading, onError, onDone } = query(
  {},
  {},
  20,
  0,
  getMeasurementUnits
);
const emit = defineEmits(["update:modelValue"]);

const selectedUnit = computed(() => {
  return props.modelValue;
});
onResult((result) => {
  units.value = result.data.measurement;
  console.log(result.data);
});

onError((error) => {
  console.log(error);
});

const handleSelect = (index) => {
  // selectedUnit.value = units.value[index].unit_name;
  openCombobox.value = false;
  emit("update:modelValue", units.value[index].unit_name);
};
</script>
