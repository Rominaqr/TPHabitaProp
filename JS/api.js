
const { createApp } = Vue

createApp({
    data() {

        return {
            url: "https://api.mercadolibre.com/sites/MLA/search?category=MLA50283",
            urlDepto: "https://api.mercadolibre.com/sites/MLA/search?category=MLA1472",
            urlDetalleItem: "https://api.mercadolibre.com/items/",
            urlPaginaPadre: "",
            error: false,
            data: [],
            datosItem: {}
        }
    },

    methods: {
        /* getData(url) {
 
             fetch(url)
                 .then(response => response.json())
                 .then(data => {
                     this.data = data.results;
                 })
         }*/

        async getData(url) {
            const response = await fetch(url);
            const data = await response.json();
            this.data = data.results;
        },

        async getDataDetalle(url) {
               const respuesta = await fetch(url);
               const dato = await respuesta.json();
               this.datosItem = dato;

               console.log(this.datosItem.location.address_line);
        },

        handleClick(id) {
            var urlPaginaPadre = window.location.href;
            localStorage.setItem("urlPaginaPadre", urlPaginaPadre);
            window.location.href = "detalle.html?parametro=" + id;
           
        },

        cargarPaginaPadre(){

            this.urlPaginaPadre = localStorage.getItem("urlPaginaPadre");
            window.location.href = this.urlPaginaPadre;

        }

    },



    created() {

        console.log(document.title);

        const title = document.title;

        switch (title) {
            case "Habitación":
                this.getData(this.url);
                break;
            case "Departamento":
                this.getData(this.urlDepto);
                break;
            case "Detalle":
                var parametro = new URLSearchParams(window.location.search).get("parametro");
                const urlitem = this.urlDetalleItem + parametro;
                this.getDataDetalle(urlitem);
                break;

            default:
                console.log("Valor erroneo");
                break;
        }

    }


}).mount('#app')