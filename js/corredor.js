/*genero la clase corredor y anexo un export para poder generar los objetos 
en mi programa principal*/
export default class Corredor{
    
    constructor(nombre, carreras){
        this.nombre=nombre;
        this.carreras=carreras;
        this.promedioCarrera=0;
        this.minT=0
        
    }

    calcularPromedio(){
    let sum=this.carreras.reduce((numA,num)=>numA+num);
    this.promedioCarrera=sum/this.carreras.length;
    }
    
    calcularMinTiempo(){
        this.minT=Math.min(...this.carreras);
    }
}