namespace TalentShow.Repos
{
    public interface IInUse
    {
        bool InUse(int id);
        bool InUse(string id);
    }
}
