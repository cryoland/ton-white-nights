namespace api.Models
{
    public class Route
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Id { get; set; }
        public int Cost { get; set; }
        public List<CheckPoint> CheckPoints { get; set; } = new();
    }
}
