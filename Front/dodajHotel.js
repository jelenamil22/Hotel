import { Gost } from "./gost.js";
import { Hotel } from "./hotel.js";

export class DodajHotel
{
    constructor ()
    {
        this.kontejner=null;
    }

    crtaj(host)
    {
        if(!host) throw new Error("Host nije validan!");

        var glavniDiv=document.createElement("div");
        glavniDiv.className="glavniDiv";
        this.kontejner=glavniDiv;
        host.appendChild(this.kontejner);

        var divDodavanje=document.createElement("div");
        divDodavanje.className="divDodavanje";
        this.kontejner.appendChild(divDodavanje);

        var divHotel=document.createElement("div");
        divHotel.className="divHotel";
        divHotel.className="col-md-3";
        divDodavanje.appendChild(divHotel);

        var divSoba=document.createElement("div");
        divSoba.className="divSoba";
        divSoba.className="col-md-3";
        divDodavanje.appendChild(divSoba);

        var divGost=document.createElement("div");
        divGost.className="divGost";
        divGost.className="col-md-3";
        divDodavanje.appendChild(divGost);

        var divGostUSobi=document.createElement("div");
        divGostUSobi.className="divGostUSobi";
        divGostUSobi.className="col-md-3";
        divDodavanje.appendChild(divGostUSobi);

        this.crtajDodajHotel(divHotel);
        this.crtajDodajSobu(divSoba);
        this.crtajDodajGosta(divGost);
        this.crtajDodajGostiUSobi(divGostUSobi);
       
        fetch("https://localhost:5001/Hotel/PreuzmiHotele", {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(el => {
                let  h=new Hotel(el.id,el.naziv,el.brojSoba,el.maxKapacitet);

                let divHotel=document.createElement("div");
                divHotel.className="divHotel";
                glavniDiv.appendChild(divHotel);
                h.crtaj(glavniDiv);  //Poziva crtaj iz Hotel
               });
           }));
    }

    crtajDodajHotel(divHotel)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj hotel";
        divHotel.appendChild(h2);

        var noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var labNaziv=document.createElement("label");
        labNaziv.innerHTML="Unesite naziv hotela:";
        divHotel.appendChild(labNaziv);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="nazivHotela";
        input.type="text";
        divHotel.appendChild(input);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var labBrojSoba=document.createElement("label");
        labBrojSoba.innerHTML="Unesite broj soba:";
        divHotel.appendChild(labBrojSoba);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="brojSoba";
        input.type="number";
        divHotel.appendChild(input);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var labMaxKapacitet=document.createElement("label");
        labMaxKapacitet.innerHTML="Unesite maksimalan broj gostiju:";
        divHotel.appendChild(labMaxKapacitet);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="maxKapacitet";
        input.type="number";
        divHotel.appendChild(input);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);

    

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj hotel";
        dugme.className="dodajHotel";
        dugme.className="btn btn-outline-primary";
        divHotel.appendChild(dugme);

        noviRed=document.createElement("br");
        divHotel.appendChild(noviRed);      

        dugme.onclick=(ev)=>
        {
            var naziv=this.kontejner.querySelector(".nazivHotela").value;
            var brojSoba=this.kontejner.querySelector(".brojSoba").value;
            var maxKapacitet=this.kontejner.querySelector(".maxKapacitet").value;

            if (naziv=="") 
            {
                alert("Neophodno je uneti naziv hotela!");
            } else if(brojSoba=="") 
            {
                alert("Neophodno je uneti broj soba u hotelu!");
            }
            else if(maxKapacitet=="")
            {
                alert("Neophodno je uneti maksimalan broj gostiju!")
            }
            else 
            {
                fetch("https://localhost:5001/Hotel/DodajHotele", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "naziv":naziv,
                        "brojSoba":brojSoba,
                        "maxKapacitet": maxKapacitet
                    })
                }).then(p => {
                    if(p.ok)
                    {
                        alert("Uspesno ste dodali hotel!");
                        document.location.reload();
                    }
                    else
                    {
                      alert("Nastala je greska prilikom dodavanja hotela!");
                        document.location.reload();

                    }
                });
             }
        }

    }


    crtajDodajSobu(divSoba)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj sobu";
        divSoba.appendChild(h2);

        var noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var labBrojSobe=document.createElement("label");
        labBrojSobe.innerHTML="Unesite broj sobe:";
        divSoba.appendChild(labBrojSobe);

        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="brojSobe";
        input.type="number";
        divSoba.appendChild(input);


        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var labKapacitet=document.createElement("label");
        labKapacitet.innerHTML="Unesite maksimalan broj gostiju sobe:";
        divSoba.appendChild(labKapacitet);

        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="kapacitetSobe";
        input.type="number";
        divSoba.appendChild(input);

        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var labSelect=document.createElement("label");
        labSelect.innerHTML="Izaberite hotel:";
        divSoba.appendChild(labSelect);

        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        var select=document.createElement("select");
        select.name="s";
        select.required=true;
        divSoba.appendChild(select);

        //dodavanje opcija
        fetch("https://localhost:5001/Hotel/PreuzmiHotele", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(hotel => {
                var opcija=document.createElement("option");
                opcija.value=hotel.id;
                opcija.innerHTML=hotel.naziv+" ";
                select.appendChild(opcija);
            });
        }));

        noviRed=document.createElement("br");
        divSoba.appendChild(noviRed);

        

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj sobu";
        dugme.className="dodajSobu";
        dugme.className="btn btn-outline-primary";
        divSoba.appendChild(dugme);
        
        dugme.onclick=(ev)=>
        {
            var brojSobe= divSoba.querySelector(".brojSobe").value;
            //var terasa=divSoba.querySelector(".terasa").value;
            var kapacitetSobe=divSoba.querySelector(".kapacitetSobe").value;
            //var hotelID=divSoba.querySelector(".hotelID").value;
            var h=divSoba.querySelector('select[name="s"]').value;

            
            if(brojSobe=="")
            {
                alert("Neophodno je uneti broj sobe!");
            } 
            else
            {
                fetch("https://localhost:5001/Hotel/DodajSobu/"+h,{
                    method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                        "broj":brojSobe,
                        "kapacitet":kapacitetSobe,
                        //"terasa":terasa,
                       })      
                }).then(p=>{
                    if(p.ok)
                    {
                        alert("Uspesno ste dodali sobu!");
                        document.location.reload();
                    }
                    else
                    {
                        alert("Nastala je greska prilikom dodavanja sobe!");
                        document.location.reload();
                    }
                });
                
            }
          
        }


    }


    crtajDodajGosta(divGost)
    {
        var h2=document.createElement("h2");
        h2.innerHTML="Kreiraj gosta";
        divGost.appendChild(h2);

        var noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        var labIme=document.createElement("label");
        labIme.innerHTML="Unesite ime gosta:";
        divGost.appendChild(labIme);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        var input=document.createElement("input");
        input.className="imeGosta";
        input.type="text";
        divGost.appendChild(input);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        var labPrezime=document.createElement("label");
        labPrezime.innerHTML="Unesite prezime gosta:";
        divGost.appendChild(labPrezime);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        input=document.createElement("input");
        input.className="prezimeGosta";
        input.type="text";
        divGost.appendChild(input);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        var labLicnKarta=document.createElement("label");
        labLicnKarta.innerHTML="Unesite broj licne karte:";
        divGost.appendChild(labLicnKarta);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        input=document.createElement("input");
        input.className="licnaKarta";
        input.type="number";
        divGost.appendChild(input);

        noviRed=document.createElement("br");
        divGost.appendChild(noviRed);

        

        var dugme=document.createElement("button");
        dugme.innerHTML="Dodaj Gosta";
        dugme.className="dodajGosta";
        dugme.className="btn btn-outline-primary";
        divGost.appendChild(dugme);
        
        dugme.onclick=(ev)=>
        {
            var imeGosta= divGost.querySelector(".imeGosta").value;
            var prezimeGosta=divGost.querySelector(".prezimeGosta").value;
            var licnaKarta=divGost.querySelector(".licnaKarta").value;
        

            if(imeGosta=="")
            {
                alert("Neophodno je uneti ime gosta!");
            }
            else if(prezimeGosta=="")
            {
                alert("Neophodno je uneti prezime gosta!");
            }else if(licnaKarta=="")
            {
                alert("Neophodno je uneti broj lcne karte!");
            }
            else{
                fetch("https://localhost:5001/Hotel/DodajGosta",{
                    method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                        "ime":imeGosta,
                        "prezime":prezimeGosta,
                        "licnaKarta":licnaKarta
                       })      
                }).then(p=>{
                    if(p.ok)
                    {
                        alert("Uspesno ste dodali gosta!");
                        document.location.reload();
                    }
                    else
                    {
                         alert("Nastala je greska prilikom dodavanja gosta!");
                        document.location.reload();
                    }
                });
                
            }
        }
    }

    crtajDodajGostiUSobi(divGostUSobi)
    {
        
        var labGosti=document.createElement("h2");
        labGosti.innerHTML="Izaberite gosta:";
        labGosti.className="labGosti";
        divGostUSobi.appendChild(labGosti);


        var noviRed=document.createElement("br");
        divGostUSobi.appendChild(noviRed);

        
        var selectGost=document.createElement("select");
        selectGost.name="gost";
        selectGost.required=true;
        divGostUSobi.appendChild(selectGost);

        //dodavanje opcija
        fetch("https://localhost:5001/Hotel/PreuzmiGoste", {

            method:"GET"
           }).then(p => p.json().then(data => {
               data.forEach(gost => {
                   var opcija=document.createElement("option");
                   opcija.value=gost.id;
                   opcija.innerHTML=gost.ime;
                   selectGost.appendChild(opcija);
               });
           }));
        noviRed=document.createElement("br");
        divGostUSobi.appendChild(noviRed);

        var labSelect=document.createElement("h2");
        labSelect.innerHTML="Izaberite hotel:";
        divGostUSobi.appendChild(labSelect);

        noviRed=document.createElement("br");
        divGostUSobi.appendChild(noviRed);

        var selectSoba=document.createElement("select");
        selectSoba.name="s";
        selectSoba.required=true;
        divGostUSobi.appendChild(selectSoba);

        //dodavanje opcija
        fetch("https://localhost:5001/Hotel/PreuzmiHotele", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(hotel => {
                var opcija=document.createElement("option");
                opcija.value=hotel.id;
                opcija.innerHTML=hotel.naziv+" "+hotel.id;
                selectSoba.appendChild(opcija);
            });
        }));


        noviRed=document.createElement("br");
        divGostUSobi.appendChild(noviRed);

        var dugmeB=document.createElement("button");
        dugmeB.innerHTML="Izaberi sobu za dati hotel i gosta ";
        dugmeB.className="izaneriSobuIGosta";
        dugmeB.className="btn btn-outline-primary";
        divGostUSobi.appendChild(dugmeB);
        

        noviRed=document.createElement("br");
        divGostUSobi.appendChild(noviRed);
        
        dugmeB.onclick=(ev)=>
        {
            dugmeB.disabled=true;
            var labSoba=document.createElement("h4");
            labSoba.innerHTML="Izaberite broj sobe:";
            labSoba.className="labSoba";
            divGostUSobi.appendChild(labSoba);

            noviRed=document.createElement("br");
            divGostUSobi.appendChild(noviRed);

            var divCheck=document.createElement("div");
            divCheck.className="divCheck";
            divGostUSobi.appendChild(divCheck);

            var hotelID=divGostUSobi.querySelector('select[name="s"]').value;


            fetch("https://localhost:5001/Hotel/PreuzmiSveSobeIzHotela/"+hotelID, {
    
                method:"GET"
               }).then(p => p.json().then(data => {
                   data.forEach(soba => {
                       var check=document.createElement("input");
                       check.type="checkbox";
                       check.name="soba";
                       check.value=soba.id;
                       divCheck.appendChild(check);

                       var labRadio=document.createElement("label");
                       labRadio.innerHTML=soba.broj;
                       labRadio.className="labRadio";
                       divCheck.appendChild(labRadio);


                   });
                }));

            noviRed=document.createElement("br");
            divGostUSobi.appendChild(noviRed);
    
            var dugme=document.createElement("button");
            dugme.innerHTML="Dodaj gosta u sobu";
            dugme.className="dodajGostaUSobu";
            dugme.className="btn btn-outline-primary";
            dugme.disabled=false;
            divGostUSobi.appendChild(dugme);

            dugme.onclick=(ev)=>
            {
                
                var gostID=divGostUSobi.querySelector('select[name="gost"]').value;
                var sobeID=document.querySelector('input[type="checkbox"]:checked').value;


                    
                        fetch("https://localhost:5001/Hotel/DodajGostaUSobu/"+gostID+"/"+sobeID,{
                         method:"POST",
                                headers:{
                                    "Content-Type": "application/json"
                                }  
                        }).then(p=>{
                            if(p.ok)
                            {
                                alert("Uspesno ste dodali gosta u sobu!");
                                dugmeB.disabled=false;
                                document.location.reload();
                            }
                            else
                            {
                                    
                                alert("Nastala je greska prilikom dodavanja gosta u sobu!");
                                dugmeB.disabled=false;
                                document.location.reload();
                            }
                        });
                    }

                
                
        }
                
        

        
    }
    

}