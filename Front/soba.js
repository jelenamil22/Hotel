import { GostiUSobi } from "./gostiUSobi.js";

export class Soba
{
    constructor(id,broj,kapacitet, terasa, pogled,hotelID)
    {
        this.id=id;
        this.broj=broj;
        this.kapacitet=kapacitet;
        this.terasa=terasa;
        this.pogled=pogled;
        //this.hotelID=hotelID;

        this.gostiUSobiNiz=new Array();
    }
    

    crtaj(divHotel)
    {
        let divSobe=document.createElement("div");
        divSobe.className="divSobe";
        divHotel.appendChild(divSobe);

        let divBroj=document.createElement("div");
        divBroj.className="divBroj";
        divHotel.appendChild(divBroj);

        let labSobe=document.createElement("h4");
        labSobe.className="labSobe";
        labSobe.innerHTML="Soba: "+this.broj+", kapacitet: "+this.kapacitet;
        divBroj.appendChild(labSobe);

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger";
        divBroj.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {
            this.ObrisiSobu(ev);
        }


        this.UzmiPodatkeOSobi(divSobe); 
    }

    ObrisiSobu(ev)
    {
        //radi
        
        fetch("https://localhost:5001/Hotel/IzbrisiSobu/"+this.id, {
            method: "DELETE"
        }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali sobu broj "+this.broj+"!");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
        });
    }

    UzmiPodatkeOSobi(divSobe)
    {
        if(this.id != null)
        {
                    
        let divBroj=document.createElement("div");
        divBroj.className="divBroj";
        divSobe.appendChild(divBroj);

        let labGost=document.createElement("h5");
        labGost.className="labGost";
        labGost.innerHTML="Gosti:";
        divBroj.appendChild(labGost);

        
        var noviRed=document.createElement("br");
        divBroj.appendChild(noviRed);

        let gostTabela=document.createElement("table");
        gostTabela.className="table";
        divBroj.appendChild(gostTabela);

        let thead=document.createElement("thead");
        gostTabela.appendChild(thead);

        let gostTr=document.createElement("tr");
        thead.appendChild(gostTr);

        var ime=document.createElement("th");
        gostTr.appendChild(ime);

        var lab=document.createElement("label");
        lab.innerHTML="Ime";
        ime.appendChild(lab);

        var prezime=document.createElement("th");
        gostTr.appendChild(prezime);

        var lab=document.createElement("label");
        lab.innerHTML="Prezime";
        prezime.appendChild(lab);


        var licnaKarta=document.createElement("th");
        gostTr.appendChild(licnaKarta); 

        var lab=document.createElement("label");
        lab.innerHTML="Broj licne karte";
        licnaKarta.appendChild(lab);


        var dg=document.createElement("th");
        gostTr.appendChild(dg); 

        var lab=document.createElement("label");
        lab.innerHTML=" ";
        dg.appendChild(lab);
        

        let tbody=document.createElement("tbody");
        gostTabela.appendChild(tbody);

        //let br=0;
      
        //ne radi
        //console.log(this.id);
        fetch("https://localhost:5001/Hotel/UzmiSveGostUSobiIzSobe/" +this.id,{

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(el => {
                  // console.log(el.gostID);
                let gosttt=new GostiUSobi(el.id,el.sobaID,el.gostID);
               // console.log(gosttt.id);
                this.gostiUSobiNiz.push(gosttt);

               //console.log(gosttt.id);
               gosttt.UzmiGosta(tbody);
               //gostiUSobi.UzmiGosta(tbody);
               //console.log(1);
               })}));
               
            }
          
    }
}