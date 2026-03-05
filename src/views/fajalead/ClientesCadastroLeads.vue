<script setup>
import axiosInstance from "@/services/http";
import { useToast } from "primevue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// inicianco router
const router = useRouter();
const route = useRoute();

// variavel de loading
let loading = ref(false);

const toast = useToast();

let lead = ref([]);

// objeto para ser enviado no post
let obj = ref({
    lead_id: null,
    nome: "",
    numero: "",
    plano: "",
    mensalidade: "",
    observacoes: "",
});

onMounted(() => {

    obj.value.id = route.params.id;

    axiosInstance.get(`/leads/${obj.value.id}`)
        .then(response => {
            lead.value = response.data.data;

            obj.value.lead_id = lead.value.id;
            obj.value.nome = lead.value.nome;
            obj.value.numero = lead.value.numero;
            obj.value.observacoes = lead.value.observacoes;
        })
        .catch(error => {
            console.error('Erro: ', error);
        })
});

function cadastrar_cliente() {
    loading.value = true;

    // expressão regular para pegar so os numeros
    obj.value.numero = obj.value.numero.replace(/\D/g, "");

    axiosInstance
        .post("/clientes/", obj.value)
        .then((response) => {
            toast.add({
                severity: "success",
                summary: "Sucesso",
                detail: response.data.message,
                life: 3000,
            });
            router.push("/fajalead/clientes");
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
</script>

<template>
    <Fluid>
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Cadastre o cliente</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Nome do cliente</label>
                        <InputText
                            id="firstname2"
                            type="text"
                            placeholder="Digite o nome do cliente..."
                            v-model="obj.nome"
                        />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Numero do Cliente</label>
                        <InputMask
                            id="lastname2"
                            mask="99 9999-9999"
                            placeholder="Digite o número sem o 9 na frente..."
                            v-model="obj.numero"
                        />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Plano</label>
                        <InputText
                            id="firstname2"
                            type="text"
                            placeholder="Digite o plano..."
                            v-model="obj.plano"
                        />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Mensalidade</label>
                        <InputNumber
                            v-model="obj.mensalidade"
                            placeholder="Digite o valor da mensalidade..."
                            mode="currency"
                            currency="BRL"
                            locale="pt-BR"
                        />
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <label for="address">Observações</label>
                    <Textarea
                        placeholder="Observações..."
                        rows="4"
                        v-model="obj.observacoes"
                    />
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <Button
                        severity="danger"
                        label="Voltar"
                        @click="$router.push('/fajalead/clientes')"
                    ></Button>
                    <Button
                        label="Cadastrar"
                        @click="cadastrar_cliente()"
                    ></Button>
                </div>
            </div>
        </div>
    </Fluid>
</template>
