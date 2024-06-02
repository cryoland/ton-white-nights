namespace api.Models
{
    public class UserRoute
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool Complete { get; set; }
        public List<UserCheckPoint> UserCheckPoints { get; set; } = new();
    }
}
