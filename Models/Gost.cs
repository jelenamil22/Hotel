using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Projekat.Models
{
    [Table ("Gost")]
    public class Gost
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [StringLength(60)] 
        [Required(ErrorMessage="Neophodno je uneti ime gosta!")]
        [Column ("Ime")]
        //[MaxLength(255)]
        public string Ime { get; set; }

        [Column ("Prezime")]
        [MaxLength(255)]
        public string Prezime { get; set; }

        [Column ("LicnaKarta")]
        public int LicnaKarta { get; set; }

        [Column ("A")]
        public int M { get; set; }

        
        [Column ("B")]
        public int N { get; set; }

        public List<GostiUSobi> GostiUSobi { get; set; }

        public Gost()
        {
            GostiUSobi=new List<GostiUSobi>();
        }

       // [JsonIgnore]
        //public virtual List<Soba> Soba {get; set; }
    }
}