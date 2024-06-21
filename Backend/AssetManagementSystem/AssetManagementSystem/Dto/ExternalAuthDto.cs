namespace AssetManagementSystem.Dto
{
    public class ExternalAuthDto
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string IdToken { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public string Provider {  get; set; }
    }
}
