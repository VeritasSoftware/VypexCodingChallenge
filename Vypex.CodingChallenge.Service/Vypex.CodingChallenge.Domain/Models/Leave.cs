using System.ComponentModel.DataAnnotations;

namespace Vypex.CodingChallenge.Domain.Models
{
    public class Leave : IValidatableObject
    {
        public Guid Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Guid EmployeeId { get; set; } = Guid.Empty;

        public virtual Employee Employee { get; set; } = default!;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (StartDate == DateTime.MinValue)
            {
                yield return new ValidationResult("Start date must be specified.", new[] { nameof(StartDate) });
            }

            if (EndDate == DateTime.MinValue)
            {
                yield return new ValidationResult("End date must be specified.", new[] { nameof(EndDate) });
            }

            if (EndDate.Date <= StartDate.Date)
            {
                yield return new ValidationResult("End date must be after Start date.", new[] { nameof(StartDate), nameof(EndDate) });
            }
            
            if (EmployeeId == Guid.Empty)
            {
                yield return new ValidationResult("EmployeeId must be specified.", new[] { nameof(EmployeeId) });
            }
        }
    }
}
