<template>
    <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
        <div class="text-center mb-6">
            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Planos</div>
            <span class="text-muted-color text-2xl">Entre em contato agora para garantir sua IA...</span>
        </div>

        <div class="grid grid-cols-12 gap-4 justify-center mt-20 md:mt-0">
            <div class="col-span-12 lg:col-span-4 lg:col-start-5 p-0 md:p-4 mt-6 md:mt-0">
                <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all"
                    style="border-radius: 10px">
                    <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Padrão</div>
                    <img src="/demo/images/landing/enterprise.svg" class="w-10/12 mx-auto" alt="enterprise" />
                    <div class="my-8 flex flex-col items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$99,00</span>
                            <span class="text-surface-600 dark:text-surface-200">por mês</span>
                        </div>
                        <Button label="Vamos começar?"
                            class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"></Button>
                    </div>
                    <Divider class="w-full bg-surface-200"></Divider>
                    <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl leading-normal">IA personalizada</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl leading-normal">Implantação gratuita</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl leading-normal">Painel completo com todas as funcionalidades
                                liberadas</span>
                        </li>
                        <li class="py-2">
                            <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                            <span class="text-xl leading-normal">Agendamento integrado com Google Calendar</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
