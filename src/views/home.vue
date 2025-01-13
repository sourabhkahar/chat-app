<template>
  <div>Home</div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from "../store/index";
import firebase  from '../fireBase/index.js'
import config from '../config.js'
import { useNotification } from "@kyvg/vue3-notification";
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

</script>

<style  scoped>
    .cross {
        background-image: url( '../assets/cross.svg' );
        display: block;
        width: 25px;
        height: 25px;
        background-size: contain;
    }
    .correct {
        background-image: url( '../assets/correct.svg' );
        display: block;
        width: 25px;
        height: 25px;
        background-size: contain;
    }

    .delete {
        background-image: url( '../assets/trash.svg' );
        display: block;
        width: 25px;
        height: 25px;
        background-size: contain;
        background-repeat: no-repeat;
    }


</style>