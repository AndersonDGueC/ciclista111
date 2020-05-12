
//importo la clase corredor
import Corredor from "./corredor.js";
//variables


const arrCorredores = [];
//let arrCorrAscendente = [];
let corredoresPremiados = [];
let valorPremio=[];

//var narr=[];
//accedemos al boton de registro de tiempos de los corredores
document.getElementById('btn-agregar-reg-tiempo').addEventListener('click', (e) => {
    document.getElementById('frm_nueva_registro_tiempo').reset();
    $('#modalRegistroTiempo').modal('toggle');
});

//obtenemos y guardamos los datos ingresados
document.querySelector('#btn_guardar_nueva_reg_tiempo').addEventListener('click', (e) => {
    if (document.getElementById('frm_nueva_registro_tiempo').reportValidity()) {
        let corred = new Corredor();
        corred.nombre = document.querySelector('#nombre_corredor').value;
        let newArr = [...document.querySelectorAll('.carrera')].map((timeCarr) => {
            return parseInt(timeCarr.value);
        });
        corred.carreras = newArr;
        corred.calcularPromedio();
        corred.calcularMinTiempo();
        arrCorredores.push(corred);

        recargarGridCorredoresT(arrCorredores);
        recargarGridPromedioCorr(arrCorredores);
        
        document.getElementById('frm_nueva_registro_tiempo').reset();
        $('modalRegistroTiempo').modal('toggle');

    }
    else {
        alert("error al validar el formulario");
    }
});

//calculo al salir
document.querySelector('#btn_salir').addEventListener('click',(e)=>{
    recargarGridCorrGanadores(arrCorredores);
})

//funcion para generar grid de tiempos de corredores
let recargarGridCorredoresT=(arr)=>{
    let HTML='';
    arr.forEach((item, index)=>{
        HTML += `<tr>
                <td>${index+1}</td>
                <td>${item.nombre}</td>
                <td>${item.carreras[0]} min</td>
                <td>${item.carreras[1]} min</td>
                <td>${item.carreras[2]} min</td>
                <td>${item.carreras[3]} min</td>
                <td>${item.carreras[4]} min</td>
                <td>
                <a href="#" indice="${index}" idTiempoCorredores="${item.id}" class="btn btn_link btn_ver">Ver</a>
                </td>
                </tr>`
    });
    document.querySelector('#tbl-registro-tiempos tbody').innerHTML=HTML;
    document.querySelectorAll(".btn_ver").forEach((element)=>{
        element.addEventListener('click', (e)=>{
            e.preventDefault();
            let corredorEncontrado=arrCorredores.find((element)=>{
                element.ide == e.target.getAttribute("idTiempoCorredores")
            });
            console.log(corredorEncontrado);
        })
    })
}
//funcion para generar el grid de los tiempos promedio de los corredores
let recargarGridPromedioCorr=(arr)=>{
    let HTML1='';
    arr.forEach((item1,index1)=>{
        HTML1 += `<tr>
                  <td>${index1+1}</td>
                  <td>${item1.nombre}</td>
                  <td>${item1.promedioCarrera} min</td>
                  </tr>`
    });
    document.querySelector('#tbl-promedio-tiempos tbody').innerHTML=HTML1;
    
}
//funcion para generar el grid de los corredores premiados
let recargarGridCorrGanadores=(arr)=>{
   
    let arrAscCorr=arr.sort((a,b)=>a.promedioCarrera-b.promedioCarrera);
    for(let i=0;i<3;i++){
        corredoresPremiados.push(arr[i]);
        if(arrAscCorr[i].nombre.toUpperCase()==="PERIQUITO PEREZ"){
            valorPremio[i]=2000000;
        }
        else{
            valorPremio[i]=0;
        }
    };
    //condicion para los premios para oro
    if(corredoresPremiados[0].nombre.trim.length<15){
        valorPremio[0]+=25000000;
    }
    else if((corredoresPremiados[0].nombre.trim.length>=15)&&(corredoresPremiados[0].nombre.trim.length<=30)){
        valorPremio[0]+=27500000;
    }
    else{
        valorPremio[0]+=30000000;
    }
    //condicion para los premios para plata
    if(corredoresPremiados[1].nombre.trim.length<10){
        valorPremio[1]+=15000000;
    }
    else if((corredoresPremiados[0].nombre.trim.length>=10)&&(corredoresPremiados[0].nombre.trim.length<=25)){
        valorPremio[1]+=17500000;
    }
    else{
        valorPremio[1]+=20000000;
    }
    //condicion para los premios para cobre
    if(corredoresPremiados[0].nombre.trim.length<13){
        valorPremio[2]+=7500000;
    }
    else if((corredoresPremiados[0].nombre.trim.length>=15)&&(corredoresPremiados[0].nombre.trim.length<=30)){
        valorPremio[2]+=10000000;
    }
    else{
        valorPremio[2]+=12500000;
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    document.querySelector('#nomcorr-tiempo1').innerHTML=`Corredor: ${corredoresPremiados[0].nombre.toUpperCase()} <br>tiempo: ${corredoresPremiados[0].promedioCarrera} min`;
  
    document.querySelector('#valor_1').innerHTML=`$${valorPremio[0]}`;
    document.querySelector('#nomcorr-tiempo2').innerHTML=`Corredor: ${corredoresPremiados[1].nombre.toLowerCase()} <br>tiempo: ${corredoresPremiados[1].promedioCarrera} min`;
   
    document.querySelector('#valor_2').innerHTML=`$${valorPremio[1]}`;
    document.querySelector('#nomcorr-tiempo3').innerHTML=`Corredor: ${corredoresPremiados[2].nombre.capitalize()} <br>tiempo: ${corredoresPremiados[2].promedioCarrera} min`;
    
    document.querySelector('#valor_3').innerHTML=`$${valorPremio[2]}`;

}




