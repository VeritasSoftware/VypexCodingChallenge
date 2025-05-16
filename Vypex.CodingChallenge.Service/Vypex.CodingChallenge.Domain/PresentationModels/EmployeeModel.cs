namespace Vypex.CodingChallenge.Domain.PresentationModels
{
    public class EmployeeModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public int TotalLeaveDays { get; set; }
    }
}
