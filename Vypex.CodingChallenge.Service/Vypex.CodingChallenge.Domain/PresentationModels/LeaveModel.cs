namespace Vypex.CodingChallenge.Domain.PresentationModels
{
    public class LeaveModel
    {
        public Guid Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Guid EmployeeId { get; set; } = Guid.Empty;
    }
}
