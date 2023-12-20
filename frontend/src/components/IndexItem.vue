<template>
    <section class="section">
        <div class="container">
            <h1 class="title">Парсер css и js файлов</h1>

            <div class="column is-half is-offset-one-quarter">
                <form class="box" @submit.prevent="sendUrl">
                    <div class="field">
                        <div class="control">
                            <input v-model="urlValue" ref="urlElement" @input="validateUrl" class="input" type="text" placeholder="введите url сайта" tabindex="-1">
                        </div>
                    </div>
                    <div class="field">
                        <button ref="submitElement" class="button is-link is-fullwidth" :disabled="!isValidUrl" tabindex="0">отправить</button>
                    </div>
                </form>
                <table-item v-if="isSendData" />
            </div>
        </div>
    </section>
</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUrlStore} from "../../store";
import TableItem from "@/components/TableItem.vue";

import { useVuelidate } from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';

const urlStore = useUrlStore()
const {urlValue, isSendData} = storeToRefs(urlStore)


const urlElement = ref(null)
const submitElement = ref(null)

const rules = {
    urlValue: { required, url }
}

const v$ = useVuelidate(rules, { urlValue });

const validateUrl = () => {
    v$.value.urlValue.$touch()
}

const check = computed(() => !isValidUrl && !isUrl)
const isValidUrl = computed(() => !v$.value.urlValue.$error)

const sendUrl = async () => {
    validateUrl()
    if (isValidUrl.value) {
        submitElement.value.classList.toggle('is-loading')
        await urlStore.getSources()
        submitElement.value.classList.toggle('is-loading')
    }
}

onMounted(() => {
    validateUrl()
    urlElement.value.focus()
})
</script>