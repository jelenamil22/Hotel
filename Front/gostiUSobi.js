import { Gost } from "./gost.js";

export class GostiUSobi
{
    constructor(id, soba, gost)
    {
        this.id=id;
        this.soba=soba;
        this.gost=gost;
    }

    UzmiGosta(tbody)
    {

        fetch("https://localhost:5001/Hotel/PreuzmiGosta/"+ this.gost, {
            

            method:"GET"
           }).then(p => p.json().then(data => {
                    console.log(this.gost);
                    

                    let gost=new Gost(this.gost,data.ime,data.prezime,data.licnaKarta);
                    //console.log(gost.ime);
                    
                    gost.crtaj(tbody,this);

            }));
        
    }
    

    Obrisi(id)
    {
        fetch("https://localhost:5001/Hotel/ObrisiGostUSobi/"+id, {
            method: "DELETE"
        }).then(p => {
            if(p.ok) {

                alert("Uspesno ste obrisali gosta!");
                document.location.reload()
            }
            else{
                alert("Doslo je do greske!");
            }
        });
    }
    

}