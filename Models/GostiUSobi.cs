using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Projekat.Models
{
    [Table ("GostiUSobi")]
    public class GostiUSobi
    {
        [Key]
        [Column ("ID")]
        public int ID { get; set; }

        [JsonIgnore]
        public Soba Soba { get; set; }

        public int SobaID { get; set; }

        [JsonIgnore]
        public Gost Gost { get; set; }

        public int GostID { get; set; }


    }
}