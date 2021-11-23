import { GostiUSobi } from "./gostiUSobi.js";

export class Gost
{
    constructor(id, ime, prezime, licnaKarta)
    {
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.licnaKarta=licnaKarta;

        this.GostiUSobiNiz=new Array();
    }

    crtaj(host,termin)
    {
        var gostTr=document.createElement("tr");
        gostTr.className="gostTr";
        host.appendChild(gostTr);

        var gostTd=document.createElement("td");
        gostTr.appendChild(gostTd);


        var select=document.createElement("select");
        select.name="select";
        select.style.display="none"
        select.required=true;
        gostTd.appendChild(select);

        fetch("https://localhost:5001/Hotel/PreuzmiGoste", {

         method:"GET"
        }).then(p => p.json().then(data => {
            data.forEach(gost => {
                var opcija=document.createElement("option");
                opcija.value=gost.id;
                opcija.innerHTML=gost.ime;
                select.appendChild(opcija);
            });
        }));

        var inputIme=document.createElement("input");
        inputIme.value=this.ime;
        inputIme.type="text";
        inputIme.className="inputIme";
        inputIme.style.display="block";
        inputIme.disabled=true;
        gostTd.appendChild(inputIme);

        var gostTd=document.createElement("td");
        gostTr.appendChild(gostTd);

        var inputPrezime=document.createElement("input");
        inputPrezime.value=this.prezime;
        inputPrezime.type="text";
        inputPrezime.className="inputPrezime";
        inputPrezime.style.display="block";
        inputPrezime.disabled=true;
        gostTd.appendChild(inputPrezime);

        var gostTd=document.createElement("td");
        gostTr.appendChild(gostTd);

        var inputLicnaKarta=document.createElement("input");
        inputLicnaKarta.value=this.licnaKarta;
        inputLicnaKarta.type="text";
        inputLicnaKarta.className="inputLicnaKarta";
        inputLicnaKarta.style.display="block";
        inputLicnaKarta.disabled=true;
        gostTd.appendChild(inputLicnaKarta);

        var gostTd=document.createElement("td");
        gostTr.appendChild(gostTd);

        let dugmeObrisi=document.createElement("button");
        dugmeObrisi.innerHTML="Obrisi";
        dugmeObrisi.className="btn btn-outline-danger dtabela";
        gostTd.appendChild(dugmeObrisi);

        dugmeObrisi.onclick=(ev)=>
        {

            let gostiUSobi=new GostiUSobi();
            gostiUSobi.Obrisi(termin.id);
        }



    }

    
}