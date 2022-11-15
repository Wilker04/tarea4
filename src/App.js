import React, { Component } from 'react';
import './App.css';

var tabla = null;

async function retornar(url) {
  try {
    fetch(url)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {
          /*
        let lista = data[i];
        let datalist = document.createElement('tbody');
        
        let nombre = lista?.nombre;
        let apellido = lista?.apellido;
        let telefono = lista?.telefono;
        
        datalist.textContent = i+1+'- '+nombre+' '+apellido+ ' ' +telefono;
        tabla.appendChild(datalist);*/
        tabla.innerHTML += "<td>"+data[i].nombre+"</td><td>"+data[i].apellido+"</td><td>"+data[i].telefono+"</td>";
        }
      });
  } catch (ex) {
    console.log(ex);
  }
}

function guardar() {
  try {
    let n = document.getElementById('nombre');
    let ap = document.getElementById('apellido');
    let no = document.getElementById('numero');
    if (n != null && ap != null && no != null) {
      fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify({
          nombre: n.value,
          apellido: ap.value,
          telefono: no.value,
        }),
      });
      retornar('http://www.raydelto.org/agenda.php');
    } else {
      window.alert('Rellene los campos faltantes');
    }
  } catch (error) {
    console.log(error);
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <AgregarContactos />
        <MostrarContactos />
      </div>
    );
  }
}

class AgregarContactos extends Component {
  render() {
    return (
      <div className="formulario">
        <form method="post">
          <input id="nombre" type="text" placeholder="Nombre" required />
          <input id="apellido" type="text" placeholder="Apellido" required />
          <input id="numero" type="number" placeholder="Numero" required />
          <button type="button" id="enviar" onClick={() => {guardar()}} className="enviar">
            GUARDAR
          </button>
        </form>
      </div>
    );
  }
}

class MostrarContactos extends Component {
  componentDidMount() {
    tabla = document.querySelector('tbody');
    retornar('http://www.raydelto.org/agenda.php');
  }
  render() {
    return (
      <div className="contenido">
        <table id="lista">
          <thead className="renglon">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
            </tr>
            </thead>
            <tbody id='body'></tbody>
        </table>
      </div>
    );
  }
}

export default App;
