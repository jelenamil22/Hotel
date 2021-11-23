using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Projekat.Models;
using Microsoft.EntityFrameworkCore;


namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelController : ControllerBase
    {
        public HotelContext Context { get; set; }
        
        public HotelController(HotelContext context)
        {
            Context = context;

        }


        //Hoteli
        [Route ("PreuzmiHotele")] //Radi
        [HttpGet]
        public async Task<JsonResult> PreuzmiHotele()
        {
            
            var hotel= await Context.Hoteli.Include(p=>p.Sobe).ToListAsync();
            return new JsonResult(hotel);
        }

        [Route ("DodajHotele")] //Radi
        [HttpPost]
        public async Task DodajHotele([FromBody] Hotel hotel)
        {
            Context.Hoteli.Add(hotel);
            await Context.SaveChangesAsync();
        }

        [Route ("IzmeniHotel")] //Radi sve
        [HttpPut]
        public async Task IzmeniHotel([FromBody] Hotel hotel)
        {
            Context.Hoteli.Update(hotel);
            await Context.SaveChangesAsync();
        }

        [Route ("IzbrisiHotel/{id}")]
        [HttpDelete]
        public async Task IzbrisiHotel(int id)
        {
            
            var hotel=await Context.Hoteli.FindAsync(id);
            var sobe=await Context.Sobe.Where(x=>x.Hotel==hotel).ToListAsync();
            sobe.ForEach(soba=>{
                Context.Sobe.Remove(soba);
            });
            Context.Hoteli.Remove(hotel);
            await Context.SaveChangesAsync();
        }

        //Sobe
        [Route ("PreuzmiSobe")]
        [HttpGet]
        public async Task<List<Soba>> PreuzmiSobe()
        {
            return await Context.Sobe.Include(p=>p.GostiUSobi).ToListAsync();
        }

        [Route("DodajSobu/{idHotela}")] //Radi
        [HttpPost]
        public async Task<IActionResult> DodajSobu(int idHotela, [FromBody] Soba soba)
        {
            var hotel = await Context.Hoteli.FindAsync(idHotela);
            

            if(hotel!=null && hotel.BrojSoba!=0)
            {
                soba.Hotel = hotel;
                hotel.BrojSoba--;
                Context.Sobe.Add(soba);
                Context.Hoteli.Update(hotel);
                await Context.SaveChangesAsync();
                return StatusCode(200);
            }
            else
            {
                return StatusCode(406);
            }
                        
        }

        [Route ("IzbrisiSobu/{id}")] //Radi
        [HttpDelete]
        public async Task IzbrisiSobu(int id)
        {
            var soba=await Context.Sobe.FindAsync(id);

            Context.Remove(soba);
            await Context.SaveChangesAsync();
        }

        [Route ("IzmeniSobu")] //Radi
        [HttpPut]
        public async Task IzmeniSobu([FromBody] Soba soba)
        {
            Context.Sobe.Update(soba);
            await Context.SaveChangesAsync();
        }

        [Route ("PreuzmiSveSobeIzHotela/{idHotela}")] //Sad radi
        [HttpGet]
        public async Task<JsonResult> PreuzmiSveSobeIzHotela(int idHotela)
        {
            var hotel=await Context.Hoteli.FindAsync(idHotela);
            var sobe=await Context.Sobe.Where(x=>x.Hotel.ID == idHotela).Include(p=>p.GostiUSobi).ToListAsync();
            
             //return await Context.Sobe.Include(p=>p.GostiUSobi).ToListAsync(
            return new JsonResult(sobe);
        }

        

        //Gosti
        [Route("DodajGosta")]
        [HttpPost]
        public async Task DodajGosta([FromBody]Gost gost)
        {
            Context.Gosti.Add(gost);
            await Context.SaveChangesAsync();
        }

        [Route("DodajGostaUSobu/{idGosta}/{idSobe}")] //Radi
        [HttpPost]
        public async Task DodajGostaUSobu(int idGosta,int idSobe)
        {
            var soba= await Context.Sobe.Where(x=>x.ID==idSobe).FirstAsync();
            var gosti =await Context.Gosti.Where(x=>x.ID==idGosta).FirstAsync();

            if (soba.Kapacitet != 0)
            {
                if (soba.Status !="Zauzeta")
                {
                    GostiUSobi gostiUSobi=new GostiUSobi();

                    gostiUSobi.Gost= gosti;
                    gostiUSobi.Soba= soba;

                    soba.Kapacitet--;
                    soba.GostiUSobi.Add(gostiUSobi);
                    soba.Status="Zauzeta";
                    Context.Sobe.Update(soba);
                    Context.GostiUSobi.Add(gostiUSobi);
                    await Context.SaveChangesAsync();
                }
                else
                {
                    StatusCode(406);
                }
                
                
            }

            else
            {
                StatusCode(406); //Kapacitet sobe je popunjen
            }

          
        }


        [Route ("PreuzmiSveGosteIzSobe/{idSobe}")]
        [HttpGet]
        
        public async Task<List<JsonResult>> PreuzmiSveGosteIzSobe (int idSobe)
        {
            var gostSoba=await Context.GostiUSobi.Where(x=>x.Soba.ID==idSobe).Include(x=>x.Gost).ToListAsync();
            List<JsonResult> Gosti=new List<JsonResult>();
            foreach(var gs in gostSoba)
            {
                var gost= await Context.Gosti.Where(x=>x==gs.Gost).ToListAsync();
                Gosti.Add(new JsonResult (gost));
            }
            return Gosti;
        }


        [HttpGet]
        [Route("UzmiSveGostUSobiIzSobe/{idSoba}")]
        public async Task<JsonResult> UzmiSveGostUSobiIzSobe(int idSoba)
        {
            var gostUSobi=await Context.GostiUSobi.Where(x=>x.Soba.ID==idSoba).ToListAsync();
            
            return new JsonResult(gostUSobi);
        }




        [HttpGet]
        [Route("PreuzmiGosta/{idGosta}")]
        public async Task<JsonResult> GetGostID(int idGosta)
        {
           var gost=await Context.Gosti.FindAsync(idGosta);
           return new JsonResult(gost);
        }


        
        [HttpGet]
        [Route ("PreuzmiGoste")]
        public async Task<List<Gost>> PreuzmiGoste()
        {
            return await Context.Gosti.Include(p=>p.GostiUSobi).ToListAsync();
        }


       /* [Route ("DodajGosta/{idHotela}/{idSobe}/{idGosta}")]
        [HttpPost]
        public async Task<IActionResult> DodajGosta(int idHotela,int idSobe, int idGosta, GostiUSobi gostiUSobi)
        {
            var hotel=await Context.Hoteli.FindAsync(idHotela);
            var soba=await Context.Sobe.FindAsync(idSobe);
            var gost=await Context.Gosti.FindAsync(idGosta);
            gostiUSobi.Soba=soba;
            gostiUSobi.Gost=gost;

            soba.GostiUSobi.Add(gostiUSobi);
            hotel.Sobe.Append(soba);

            Context.GostiUSobi.Add(gostiUSobi);
            Context.Sobe.Update(soba);
            Context.Gosti.Update(gost);
            Context.Hoteli.Update(hotel);

            await Context.SaveChangesAsync();
            return StatusCode(200);
        }*/

         [HttpDelete]
        [Route("ObrisiGostUSobi/{idGostUSobi}")]
        public async Task DeleteGostUSobi(int idGostUSobi)
        {
            var gostSoba=await Context.GostiUSobi.FindAsync(idGostUSobi);
            var soba= await Context.Sobe.Where(x=>x.ID==gostSoba.SobaID).FirstAsync();
            soba.Status="Slobodna";
            

            Context.Sobe.Update(soba);
            Context.GostiUSobi.Remove(gostSoba);
            await Context.SaveChangesAsync();
        }

    }
}
