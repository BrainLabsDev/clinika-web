<template>
  <div class="calendar-container is-light-mode">
    <Qalendar
      :events="eventsComputed"
      :config="config"
      :is-loading="isLoading"
      @edit-event="eventEdit"
      @delete-event="eventDelete"
    />

    <q-card style="width: 100%; height: 45px">
      <q-card-section class="row justify-center items-center">
        <div class="q-mr-md">
          <q-badge
            color="green"
            class="q-mr-sm"
            style="width: 20px"
          />Confirmada
        </div>
        <div class="q-mr-md">
          <q-badge color="orange" class="q-mr-sm" style="width: 20px" />No
          Confirmada
        </div>
        <div class="q-mr-md">
          <q-badge color="red" class="q-mr-sm" style="width: 20px" />Cancelada
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Qalendar } from 'qalendar';
import { ref, computed } from 'vue';
export default {
  name: 'AgendaCalendar',
  components: {
    Qalendar,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const eventEdit = (event) => {
      emit('event-edit', event);
    };

    const eventDelete = (event) => {
      emit('event-delete', event);
    };

    const eventsComputed = computed(() => {
      return props.isLoading ? [] : props.events;
    });

    const config = ref({
      // see configuration section
      locale: 'es-ES',
      // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
      // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
      defaultMode: props.isLoading ? 'day' : 'week',
      showCurrentTime: true, // Display a line indicating the current time,
      isSilent: true,

      dayBoundaries: {
        start: 8,
        end: 18,
      },
      style: {
        colorSchemes: {
          confirmada: {
            color: '#fff',
            backgroundColor: '#16A34A',
          },
          noConfirmada: {
            color: '#fff',
            backgroundColor: '#F59E0B',
          },
          cancelada: {
            color: '#fff',
            backgroundColor: '#EF4444',
          },
        },
      },
    });

    return {
      config,
      eventsComputed,
      eventDelete,
      eventEdit,
    };
  },
};
</script>

<style>
.calendar-container {
  width: 100%;
  height: 75vh;
  background-color: white;
}

.day-timeline__hour-text,
.week-timeline__day-name {
  font-size: 14px !important;
}
</style>
