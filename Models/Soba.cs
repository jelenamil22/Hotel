using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace Projekat.Models
{
    [Table ("Soba")]
    public class Soba
    {
        [Key]
        [Column ("ID")]
        public int ID { get; set; }

        [Column ("Broj")]
        public int Broj { get; set; }

        [Column ("Kapacitet")]
        //[MaxLength(2)]
        public int Kapacitet { get; set; }

        [Column ("Terasa")]
        public bool Terasa { get; set; }

        [Column ("Pogled")]
        public string Pogled { get; set; }

        [Column ("Cena")]
        public double Cena { get; set; }

        [Column ("Status")]
        public string Status { get; set; }

        [Column ("X")]
        public int X { get; set; }

        
        [Column ("Y")]
        public int Y { get; set; }

        [JsonIgnore]
        public virtual Hotel Hotel { get; set;}

        //[Column ("GostiUSobi")]
        public List<GostiUSobi> GostiUSobi { get; set; }

        public Soba ()
        {
            GostiUSobi=new List<GostiUSobi>();
        }

        
        //public virtual List<Gost> GostiUSobi { get; set;}

       
    }
}