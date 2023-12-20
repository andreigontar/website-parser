import { createPinia, defineStore } from 'pinia';
import {ref, computed} from "vue";
import axios from "axios";

const pinia = createPinia();

export const useUrlStore = defineStore('url', () => {

    let urlValue = ref('')
    let errorServer = ref(false)
    let isSendData = ref(false)

    let css = ref([])
    let js = ref([])

    let isData = computed(() => !!css.value.length || !!js.value.length)

    const getSources = async () => {
        isSendData.value = false
        errorServer.value = false

        try {
            const response = await axios.post('http://localhost:5000/api/get-sources', {url: urlValue.value})

            if (response.data) ({css: css.value, js: js.value} = response.data)
        } catch (e) {
            errorServer.value = true
        }

        isSendData.value = true
        return true
    }

    return {
        urlValue,
        css,
        js,
        isData,
        errorServer,
        isSendData,
        getSources
    }
})

export default pinia;