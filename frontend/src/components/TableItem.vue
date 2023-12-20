<template>
    <div class="box">
        <div class="field" v-if="errorServer && isSendData">Произошла ошибка на сервере</div>
        <div class="table-container" v-else>
            <table class="table is-fullwidth is-striped is-narrow">
                <thead>
                <tr>
                    <th>JS</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="jsFile in js" :key="jsFile">
                    <td>{{ jsFile }}</td>
                </tr>
                </tbody>
            </table>

            <table class="table is-fullwidth is-striped is-narrow">
                <thead>
                <tr>
                    <th>CSS</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cssFile in css" :key="cssFile">
                    <td>{{ cssFile }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import {useUrlStore} from "../../store";
const urlStore = useUrlStore()

import {storeToRefs} from "pinia";
const {css, js, errorServer, isSendData} = storeToRefs(urlStore)

</script>