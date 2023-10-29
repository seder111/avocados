/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = 'https://platzi-avo.vercel.app';
const appNode = document.querySelector('#app');

const formatPrice = (price) => {
    const newPrice = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    }).format(price);
    return newPrice;
}

//Web API
// 1. Conectarnos a la API
fetch(`${baseURL}/api/avo`)
    // Procesar la respuesta, y convertirla en JSON
    .then( response => response.json())
    // JSON -> Data -> Renderizar en el browser.
    .then( responseJson => {
        //Creamos un array para agregar cada elemento
        const allItems = [];

        responseJson.data.forEach(element => {
            //Crear img
            const img = document.createElement('img');
            img.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            img.src= `${baseURL}${element.image}`;
            
            //Crear title
            const title = document.createElement('h2');
            //Styles
            title.className = "text-3xl font-semibold";
            title.textContent = element.name;

            //Crear price
            const price = document.createElement('div');
            price.className = "text-gray-600"
            price.textContent = formatPrice(element.price);

            //Agregamos el Titulo y el precio a un div
            const titleAndprice = document.createElement('div')
            titleAndprice.className = "text-center md:text-left"
            titleAndprice.append(title,price)

            //Agregamos el item a un div
            const card = document.createElement('div')
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(img, titleAndprice);

            //Agregamos el div al array
            allItems.push(card)
                        
        });

        //Agregamos el array al body
        appNode.append(...allItems);

    })