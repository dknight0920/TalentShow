namespace TalentShow.Services
{
    public class ScoreRatingService
    {
        public string Rating
        (
            double score
        )
        {
            if (score >= 120)
                return "Superior";
            if (score >= 90 && score < 120)
                return "Excellent";
            if (score >= 60 && score < 90)
                return "Good";

            return "Fair";
        }
    }
}