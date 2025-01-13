<template>
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Add Room</h1>
        </div>
        <form  class="mx-auto mb-0 mt-8 max-w-md space-y-4" @submit.prevent="onSubmit">
          <div>
            <label for="room" class="sr-only">Room</label>

            <div class="relative">
              <input
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Room Name"
                v-model="room"
                v-bind="roomAttrs"
              />
            </div>
            <span class="text-red-500" v-if="errors['form.room']">{{errors['form.room']}}</span>
          </div>

          <div class="flex items-center justify-between">
            <!-- <p class="text-sm text-gray-500">
              No account?
              <a class="underline" href="" @click.prevent="toggleForm">Sign up</a>
            </p> -->

            <button
              type="submit"
              class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>

      <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";
import config from '../config.js'
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import firebase  from '../fireBase/index.js'
import * as yup from 'yup';
const router = useRouter()
const { notify }  = useNotification()
const { errors, defineField ,handleSubmit} = useForm({
  validationSchema: yup.object({
    form: yup.object({
        room: yup.string().required('Room Name is Required')
    }),
  }),
});
const [room, roomAttrs] = defineField('form.room');

let onSubmit = handleSubmit((values)=>{
    addRoom(values.form);
})

let addRoom = (from)=>{
    try {
        let res = firebase.addchatRooms(from)
        if(res){
            notify({
                text: 'Room Added Successfully',
                type: 'success',
            })
        } else {
            notify({
                text: 'Unable tot Add Room',
                type: 'error',
            })
        }
        router.go(-1)
    } catch (error) {
        console.log(error);
    }
}
</script>

<style>

</style>