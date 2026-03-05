<template>
    <div id="hero" class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden" style="
    background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)),
    radial-gradient(
        77.36% 256.97% at 77.36% 57.52%,
        rgb(224, 242, 254) 0%,   /* azul bem claro */
        rgb(186, 230, 253) 50%,  /* azul suave */
        rgb(125, 211, 252) 100%  /* azul claro */
    );
clip-path: ellipse(150% 87% at 93% 13%);
">
        <div class="mx-6 md:mx-20 mt-0 md:mt-6">
            <h1 class="text-6xl font-bold text-gray-900 leading-tight">
                <span class="font-light block">Transforme seu atendimento</span>
                Nossa IA veio para resolver seus problemas
            </h1>

            <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700">
                Acompanhe tudo de forma organizada através do nosso painel moderno e integrado
            </p>

            <Button label="Vamos começar?" as="router-link" to="/" rounded class="bg-emerald-500 text-xl! mt-8 px-4!" />
        </div>

        <div class="flex justify-center md:justify-end">
            <img src="/imagem1.png" alt="Hero Image" class="h-100 rounded md:w-auto" />
        </div>
    </div>
</template>
