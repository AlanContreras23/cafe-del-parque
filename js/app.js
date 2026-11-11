const envioDomicilio = 1500;
const compraMinima= 15000;
const ruta ='data/productos.json';




let carta=[];
let pedido=JSON.parse(localStorage.getItem("pedido")) || [];
let historial=JSON.parse(localStorage.getItem("historial")) || []; 


const buscador =document.getElementById("buscar");
console.log(buscador);

const mensajeCarga = document.getElementById("mensaje-carga");
console.log(mensajeCarga);

const listaPedido = document.getElementById("lista-pedido");
console.log(listaPedido);
const pedidoVacio = document.getElementById("pedido-vacio");
console.log(pedidoVacio);
const contador = document.getElementById("contador");
console.log(contador);


const filtro= document.getElementById("categoria");
console.log(filtro);
const menu = document.getElementById("menu");
console.log(menu);
const propina=document.getElementById("propina");
console.log(propina);


const subtotal=document.getElementById("subtotal");
console.log(subtotal);
const montoPropina=document.getElementById("monto-propina");
console.log(montoPropina);
const envio = document.getElementById("envio");
console.log(envio);
const total=document.getElementById("total");
console.log(total);

const vaciarPedido=document.getElementById("vaciar");
console.log(vaciarPedido);

const nombre=document.getElementById("nombre");
console.log(nombre);
const telefono=document.getElementById("telefono");
console.log(telefono);
const direccion=document.getElementById("direccion");
console.log(direccion);

const confirmarPedido=document.getElementById("confirmar");
console.log(confirmarPedido);

const borrarHistorial=document.getElementById("borrar-historial");
console.log(borrarHistorial);

const listaHistorial=document.getElementById("lista-historial");
console.log(listaHistorial);

const opcionesEntrega = document.querySelectorAll('[name="entrega"]');
console.log(opcionesEntrega);


async function cargarProductos(){try{
    const response = await fetch(ruta);
    if(!response.ok){
      throw new Error ("No funco el archivo");
    }
    carta= await response.json();
    mostrarCarta(carta);

    }catch(error){
      console.log(error.message);
      menu.innerHTML="<p>Error en la carga de la carta</p>";
      Swal.fire({
        icon: "error",
        title: "Error en la carga",
        text: "No se cargo la carta, por favor recargue la pagina"
});

    }
  finally{
  mensajeCarga.style.display="none";  
  
  }
  }
cargarProductos();

function mostrarCarta(producto){
  menu.innerHTML="";
  if (producto.length === 0) {
  menu.innerHTML = "<p>No hay nada para mostrar</p>";
  return ;  
}
  producto.forEach(tarjeta => {
   const contenedor=document.createElement("div");
   const categoria=document.createElement("span");
   const descripcion=document.createElement("p");
   const precio =document.createElement("p");
   const nombre=document.createElement("h3");
   const boton=document.createElement("button");

   descripcion.classList.add("descripcion");
   categoria.classList.add("etiqueta");
   precio.classList.add("precio");
   contenedor.classList.add("tarjeta");
   boton.classList.add("boton");
   
  
  categoria.textContent = tarjeta.categoria;
  nombre.textContent = tarjeta.nombre;
  descripcion.textContent = tarjeta.descripcion;
  precio.textContent = "$"+ tarjeta.precio.toLocaleString("es-AR");
  boton.textContent = "Agregar";
  if(!tarjeta.disponible){
    contenedor.classList.add("no-disponible");
    boton.textContent="No disponible";
    boton.disabled = true;
  
  }
   
  contenedor.append(categoria, nombre, descripcion, precio, boton);
  menu.append(contenedor);
    });

}



function filtrarCarta(productoBuscado){
  const resultado= carta.filter(n=>n.nombre.toLowerCase().includes(productoBuscado.toLowerCase()));


mostrarCarta(resultado);

}

