<script setup>
import axiosInstance from "@/services/http";
import axios from "axios";
import { useToast } from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// inicianco router
const router = useRouter();

let mensagem = ref([]);

// variavel de loading
let loading = ref(false);

const toast = useToast();

// objeto para ser enviado no post
let obj = ref({
    id: null,
    mensagem: "",
    created_at: "",
    updated_at: ""
});

// carregamento
let carregamento = ref(true);

onMounted(() => {
    // verifica se está conectado
    verificarConexao();

    axiosInstance
        .get("/prompt")
        .then((response) => {
            mensagem.value = response.data.data;

            obj.value.id = mensagem.value[0].id;
            obj.value.mensagem = mensagem.value[0].mensagem;
        })
        .catch((error) => {
            console.error("Erro: ", error);
        })
        .finally(() => {
            carregamento.value = false;
        });
});

function atualizar_mensagem() {
    loading.value = true;

    axiosInstance
        .put(`/prompt/${obj.value.id}`, obj.value)
        .then((response) => {
            toast.add({
                severity: "success",
                summary: "Sucesso",
                detail: response.data.message,
                life: 3000,
            });
        })
        .catch((error) => {
            console.error("Erro: ", error);
            toast.add({
                severity: "error",
                summary: "Erro",
                detail: "Erro na validação",
                life: 3000,
            });
        });
}

//// parte do qrcode
// conexão com a evolution api
const evolutionApi = axios.create({
    baseURL: 'https://evolutionapi.fajatech.com.br',
    headers: {
        apikey: import.meta.env.VITE_EVOLUTION_API_KEY
    }
});

// variavies utilizadas do qrcode
const qrcodeBase64 = ref('');
const statusConexao = ref('');
const instancia = ref('');

// função que faz a geração do qrcode
async function gerarQrCode() {
    try {
        const response = await evolutionApi.get(`/instance/connect/${instancia.value}`);
        qrcodeBase64.value = response.data.base64;
        display.value = true;
    } catch (error) {
        console.error('erro: ', error);
    }
}

async function verificarConexao() {
    try {
        const resApi = await axiosInstance.get('/empresas');
        instancia.value = resApi.data.data[0].instancia;

        const res = await evolutionApi.get('/instance/fetchInstances');
        const instancias = res.data;
        instancias.forEach(inst => {
            if (inst.name === instancia.value) {
                statusConexao.value = inst.connectionStatus === 'open' ? 'Conectado' : 'Não conectado';
            }
        });
    } catch (erro) {
        console.error(erro);
    }
}

const display = ref(false);
function close() {
    display.value = false;
}

</script>

<template>
    <!-- tela de carregamento -->
    <div class="flex flex-col justify-center items-center h-screen" v-if="carregamento">
        <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div class="card">
        <div class="font-semibold text-xl mb-4">Clique em gerar e depois aponte seu celular para o QRcode para conectar
            seu WhatsApp -- Status atual:
            <span :class="statusConexao == 'Conectado' ? 'text-green-500' : 'text-red-500'">{{ statusConexao }}</span>
        </div>
        <Dialog v-model:visible="display" header="QR Code" :modal="true" :style="{ width: '350px' }">
            <div v-if="qrcodeBase64">
                <p class="mb-3">Escaneie o QR Code com o WhatsApp. Após isso, caso tenha conectado sem problemas, basta
                    atualizar a pagina para verificar se o status está como 'Conectado'</p>
                <img :src="qrcodeBase64" alt="QR Code" style="width: 100%;filter: grayscale(100%) contrast(200%);" />
            </div>
            <div v-else-if="statusConexao">
                <p>{{ statusConexao }}</p>
            </div>
            <div v-else>
                <p>Carregando...</p>
            </div>
            <template #footer>
                <Button label="Fechar" @click="close" />
            </template>
        </Dialog>
        <Button label="Gerar" @click="gerarQrCode" />
    </div>

    <Fluid v-if="!carregamento">
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <div class="flex flex-wrap">
                    <label for="address">Prompt da IA</label>
                    <Textarea placeholder="Digite aqui o prompt..." rows="30" v-model="obj.mensagem" />
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <Button label="Atualizar prompt" @click="atualizar_mensagem()"></Button>
                </div>
            </div>
        </div>
    </Fluid>
</template>
