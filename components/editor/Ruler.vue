<script setup lang="ts">
const markers = Array.from({ length: 83 }, (_, i) => i)

const positions = markers.map((marker) => {
  return marker * 816 / 82
})

const leftMargin = ref(56)
const rightMargin = ref(56)

const isDraggingLeft = ref(false)
const isDraggingRight = ref(false)

const rulerRef = ref<HTMLDivElement | null>(null)

function handleLeftMouseDown() {
  isDraggingLeft.value = true
}

function handleRightMouseDown() {
  isDraggingRight.value = true
}

function handleMouseMove(e: MouseEvent) {
  const PAGE_WIDTH = 816
  const MINIMUM_SPACE = 100

  if ((isDraggingLeft.value || isDraggingRight.value) && rulerRef.value) {
    const container = rulerRef.value?.querySelector('#ruler-container')
    if (container) {
      const containerRect = container.getBoundingClientRect()
      const relativeX = e.clientX - containerRect.left
      const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX))

      if (isDraggingLeft.value) {
        const maxLeftPosition = PAGE_WIDTH - rightMargin.value - MINIMUM_SPACE
        leftMargin.value = Math.min(maxLeftPosition, rawPosition)
      }
      else if (isDraggingRight.value) {
        const maxRightPosition = PAGE_WIDTH - (leftMargin.value + MINIMUM_SPACE)
        const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0)
        rightMargin.value = Math.min(newRightPosition, maxRightPosition)
      }
    }
  }
}

function handleMouseUp() {
  isDraggingLeft.value = false
  isDraggingRight.value = false
}

function handleMouseLeftDoubleClick() {
  leftMargin.value = 56
}

function handleMouseRightDoubleClick() {
  rightMargin.value = 56
}
</script>

<template>
  <div
    ref="rulerRef"
    class="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <div id="ruler-container" class="max-w-[816px] mx-auto w-full h-full relative">
      <div class="absolute inset-x-0 bottom-0 h-full">
        <div class="relative h-full w-[816px]">
          <Marker
            :position="leftMargin"
            :is-left="true"
            :is-dragging="isDraggingLeft"
            :on-double-click="handleMouseLeftDoubleClick"
            :on-mouse-down="handleLeftMouseDown"
          />
          <Marker
            :position="rightMargin"
            :is-left="false"
            :is-dragging="isDraggingRight"
            :on-double-click="handleMouseRightDoubleClick"
            :on-mouse-down="handleRightMouseDown"
          />
          <div
            v-for="marker in markers" :key="marker" class="absolute bottom-0"
            :style="{
              left: `${positions[marker]}px`,
            }"
          >
            <template v-if="marker % 10 === 0">
              <div class="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
              <span class="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                {{ marker / 10 + 1 }}
              </span>
            </template>
            <template v-else-if="marker % 5 === 0">
              <div class="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
            </template>
            <template v-else>
              <div class="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
