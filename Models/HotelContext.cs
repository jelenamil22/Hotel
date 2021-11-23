using Microsoft.EntityFrameworkCore;

namespace Projekat.Models
{
    public class HotelContext : DbContext
    {
        
        public DbSet<Hotel> Hoteli { get; set; } //svaka klasa koja se kreira u bazi mora ovako da se poveze

        public DbSet<Soba> Sobe { get; set; }

        public DbSet<Gost> Gosti { get; set; }

        public DbSet<GostiUSobi> GostiUSobi { get; set; }

        public HotelContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}