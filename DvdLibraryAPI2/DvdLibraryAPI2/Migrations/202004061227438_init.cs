namespace DvdLibraryAPI2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Dvds",
                c => new
                    {
                        dvdId = c.Int(nullable: false, identity: true),
                        director = c.String(maxLength: 50),
                        realeaseYear = c.Int(nullable: false),
                        title = c.String(maxLength: 50),
                        rating = c.String(maxLength: 10),
                        notes = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.dvdId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Dvds");
        }
    }
}
