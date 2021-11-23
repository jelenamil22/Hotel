using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Projekat.Models
{
    [Table ("Hotel")]

    public class Hotel
    {
        [Key]
        [Column ("ID")]
        public int ID { get; set; }

        [Column ("Naziv")]
        [MaxLength (255)]
        public string Naziv { get; set; }

        [Column ("BrojSoba")]
        public int BrojSoba { get; set; }

        [Column ("MaxKapacitet")]
        public int MaxKapacitet { get; set; }

        [Column ("M")]
        public int M { get; set; }

        
        [Column ("N")]
        public int N { get; set; }


        public virtual List<Soba> Sobe { get; set; }

        public Hotel()
        {
            Sobe=new List<Soba>();
        }

        //public virtual List<Gost> Gosti { get; set; }



    }
}