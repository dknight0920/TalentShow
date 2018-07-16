namespace TalentShowDataStorage.Utils.Models
{
    public class DatabaseFile
    {
        public string Name { get; private set; }
        public string PhysicalFileName { get; private set; }
        public long SizeInBytes { get; private set; }
        public string StateDesc { get; private set; }

        public DatabaseFile
        (
            string name,
            string physicalFileName,
            long sizeInBytes,
            string stateDesc
        )
        {
            Name = name;
            PhysicalFileName = physicalFileName;
            SizeInBytes = sizeInBytes;
            StateDesc = stateDesc;
        }
    }
}