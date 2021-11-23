import { Soba } from "./soba.js";

export class Hotel
{
    constructor(id, naziv, brojSoba, max)
    {
        this.id=id;
        this.naziv=naziv;
        this.brojSoba=brojSoba;
        this.maxKapacitet=max;

        this.sobe=new Array();
        this.kontejner=null;

    }

    crtaj(host)
    {
        if(!host) throw new Error("Greska!");
   
        let divHotel=document.createElement("div");
        divHotel.className="divHotel";
        this.kontejner=divHotel;
        host.appendChild(this.kontejner);

        let divNaslov= document.createElement("div");
        divNaslov.className="divNaslov";
        divHotel.appendChild(divNaslov);

        let labNaziv=document.createElement("label");
        labNaziv.className="labNaziv";
        labNaziv.style.display="block";
        labNaziv.innerHTML=this.naziv;
        divNaslov.appendChild(labNaziv);

        let inputNaziv=document.createElement("input");
        inputNaziv.style.display="none"; 
        inputNaziv.className="naziv";
        inputNaziv.type="text";
        divNaslov.appendChild(inputNaziv);
              
        let labBrojSoba=document.createElement("label");
        labBrojSoba.className="labBrojSoba";
        labBrojSoba.style.display="block";
        labBrojSoba.innerHTML=this.brojSoba;
        divNaslov.appendChild(labBrojSoba);

        let inputBrojSoba=document.createElement("input");
        inputBrojSoba.style.display="none"; 
        inputBrojSoba.className="brojSoba";
        inputBrojSoba.type="text";
        divNaslov.appendChild(inputBrojSoba);

        let labMaxKapacitet= document.createElement("label");
        labMaxKapacitet.className="labMaxKapacitet";
        labMaxKapacitet.style.display="block";
        labMaxKapacitet.innerHTML=this.maxKapacitet;
        divNaslov.appendChild(labMaxKapacitet);

        let inputMaxKapacitet=document.createElement("input");
        inputMaxKapacitet.style.display="none";
        inputMaxKapacitet.className="maxKapacitet";
        inputMaxKapacitet.type="text";
        divNaslov.appendChild(inputMaxKapacitet);

        let dugmeIzmeni=document.createElement("button");
        dugmeIzmeni.innerHTML="Izmeni";
        dugmeIzmeni.className="btn btn-outline-secondary dugme";
        dugmeIzmeni.style.display="block";
        divNaslov.appendChild(dugmeIzmeni);

        let dugmeSacuvaj=document.createElement("button");
        dugmeSacuvaj.innerHTML="Sacuvaj";
        dugmeSacuvaj.className="btn btn-outline-success dugme";
        dugmeSacuvaj.style.display="none";
        divNaslov.appendChild(dugmeSacuvaj);

        let dugmeOtkazi=document.createElement("button");
        dugmeOtkazi.innerHTML="Otkazi";

        dugmeOtkazi.className="btn btn-outline-secondary dugme";
        dugmeOtkazi.style.display="none";
        divNaslov.appendChild(dugmeOtkazi);

        dugmeIzmeni.onclick=(ev)=>

        {
            labNaziv.style.display="none";
            labBrojSoba.style.display="none";
            labMaxKapacitet.style.display="none";

            inputNaziv.style.display="block";
            inputBrojSoba.style.display="block";
            inputMaxKapacitet.style.display="block";

            dugmeIzmeni.style.display="none";
            dugmeSacuvaj.style.display="block";
            dugmeOtkazi.style.display="block";
            divNaslov.querySelector(".naziv").value=this.naziv;
            divNaslov.querySelector(".brojSoba").value=this.brojSoba;
            divNaslov.querySelector(".maxKapacitet").value=this.maxKapacitet;
            
        }

        dugmeSacuvaj.onclick=(ev)=>
        {
            let naziv=divNaslov.querySelector(".naziv").value;
            let brojSoba=divNaslov.querySelector(".brojSoba").value;
            let maxKapacitet=divNaslov.querySelector(".maxKapacitet").value;
            
            //radi
            fetch("https://localhost:5001/Hotel/IzmeniHotel/",{
                method:"PUT",
                    headers:{
                            "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "id":this.id,
                        "naziv":naziv,
                        "brojSoba":brojSoba,
                        "maxKapacitet":maxKapacitet
                    })      
            }).then(p=>{
                if(p.ok)
                {
                    console.log("PROSLO");
                    labNaziv.innerHTML=naziv;
                    labNaziv.style.display="block";
                    labBrojSoba.innerHTML=brojSoba;
                    labBrojSoba.style.display="block";
                    labMaxKapacitet.innerHTML=maxKapacitet;
                    labMaxKapacitet.style.display="block";

                    inputNaziv.style.display="none";
                    inputBrojSoba.style.display="none";
                    inputMaxKapacitet.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";
                }
                else
                {
                    console.log("NIJE PROSLO");  
                    labNaziv.innerHTML=this.naziv;
                    labNaziv.style.display="block";
                    labBrojSoba.innerHTML=this.brojSoba;
                    labBrojSoba.style.display="block";
                    labMaxKapacitet.innerHTML=this.maxKapacitet;
                    labMaxKapacitet.style.display="block";

                    inputNaziv.style.display="none";
                    inputBrojSoba.style.display="none";
                    inputMaxKapacitet.style.display="none";

                    dugmeIzmeni.style.display="block";
                    dugmeSacuvaj.style.display="none";
                    dugmeOtkazi.style.display="none";

                    
                }
            })

        }

        dugmeOtkazi.onclick=(ev)=>
        {
            labNaziv.innerHTML=this.naziv;
            labNaziv.style.display="block";
            labBrojSoba.innerHTML=this.brojSoba;
            labBrojSoba.style.display="block";
            labMaxKapacitet.innerHTML=this.maxKapacitet;
            labMaxKapacitet.style.display="block";

            inputNaziv.style.display="none";
            inputBrojSoba.style.display="none";
            inputMaxKapacitet.style.display="none";

            dugmeIzmeni.style.display="block";
            dugmeSacuvaj.style.display="none";
            dugmeOtkazi.style.display="none";
        }


        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger dugme";
        divNaslov.appendChild(dugmeObrisi);

        //radi
        dugmeObrisi.onclick=(ev)=> 
        {
            fetch("https://localhost:5001/Hotel/IzbrisiHotel/"+ this.id, {
            method: "DELETE"
            }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali Hotel "+this.naziv+" ! ");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
            });
        }           
        this.dodajSobuUHotel(divHotel);

    }

    dodajSobuUHotel(divHotel)
    {
        //radi
        fetch("https://localhost:5001/Hotel/PreuzmiSveSobeIzHotela/"+this.id, {

            method:"GET"
           }).then(p => p.json().then(data => {
               if(data.length > 0)
               {
               data.forEach(el => {
               
                let soba=new Soba(el.id,el.broj,el.kapacitet,el.terasa,el.pogled);

                soba.crtaj(divHotel);
                   
                this.sobe.push(soba);
                  
    
                })
            }
        }));
    }
}