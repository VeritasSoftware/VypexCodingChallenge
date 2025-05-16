namespace Vypex.CodingChallenge.Domain.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public virtual ICollection<Leave> Leaves { get; set; } = new List<Leave>();
    }
}
