<template>
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Add Nickname</h1>
        </div>
        <form  class="mx-auto mb-0 mt-8 max-w-md space-y-4" @submit.prevent="handleSignIn">
          <div>
            <label for="nickname" class="sr-only">Nickname</label>

            <div class="relative">
              <input
                type="nickname"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter nickname"
                v-model="nickname"
                v-bind="nicknameAttrs"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
            <span class="text-red-500" v-if="errors['form.nickname']">{{errors['form.nickname']}}</span>
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
              Log In
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
import { useUserStore } from "../store/user.js";
import { useNotification } from "@kyvg/vue3-notification";
import config from '../config.js'
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, defineField ,handleSubmit} = useForm({
  validationSchema: yup.object({
    form: yup.object({
      nickname: yup.string().required('Nickname is Required')
    }),
  }),
});

const [nickname, nicknameAttrs] = defineField('form.nickname');
const router = useRouter()
const user = useUserStore()
const { notify }  = useNotification()

let handleSignIn = handleSubmit((values)=>{
  signIn(values.form);
})

const signIn = (form) => {
  try {
    router.push({
        name: 'RoomList',
        params: { nickname: form.nickname }
      })
    // firebase.signInWithEmailAndPassword(firebase.auth, form.email, form.password)
    //   .then((userCredential) => {
    //     user.setUser(userCredential.user)
    //     router.push({name:'home'})
    //     notify({
    //             text: 'Login successfully',
    //             type: 'success',
    //         });
    //   })
    //   .catch((error) => {
    //     notify({
    //             text: 'Unable login',
    //             type: 'error',
    //         });
    //   });
  } catch (error) {
    console.log(error)
    notify({
            text: config.message.generalError,
            type: 'error',
        });
  }
}

</script>