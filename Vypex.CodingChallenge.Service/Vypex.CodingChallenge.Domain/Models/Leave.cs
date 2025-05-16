using System.ComponentModel.DataAnnotations;

namespace Vypex.CodingChallenge.Domain.Models
{
    public class Leave : IValidatableObject
    {
        public Guid Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EndDate <= StartDate)
            {
                yield return new ValidationResult("End date must be after Start date.", new[] { nameof(StartDate), nameof(EndDate) });
            }            
        }
    }
}
