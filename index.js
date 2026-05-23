console.log(process.argv);

const [, , method, endpoint, ...args] = process.argv;

console.log(`Method: ${method}`);
console.log(`Endpoint: ${endpoint}`);
console.log(args);

const partes = endpoint.split("/");
const recurso = partes[0];
const id = partes [1];

if (method === "GET" && recurso === "products" && !id){
    console.log ("Handling GET request");
        try{
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json();
            console.log(data);
        }catch (error) {
        console.error("Error fetching products: ", error);
        }
    } else if (method === "GET" && recurso ==="products" && id) {
        try{
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            console.log(data);
        }catch (error){
            console.error("Error fetching product:", error);
        }
    } else if (method === "POST" && recurso === "products"){
        console.log("Handling POST request");

        const [title, price, category] = args;
        
        const product = { title, price: Number(price), category};
            fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
            })
        .then(response => response.json())
        .then(data => console.log(data));

    } else if (method === "DELETE" && recurso ==="products" && id){
            try{
                const response = await fetch(`https://fakestoreapi.com/products/${id}`,{method: "DELETE"});
                const data = await response.json();
                console.log(data);
                console.log(`El articulo : ${data.title} ha sido eliminado`)
        
            } catch (error){
                console.error("Error Deleting product: ", error);
            }
    } else {
        console.log("Ruta no encontrada")
    }
