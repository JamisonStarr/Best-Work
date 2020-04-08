namespace DvdLibraryAPI2.Migrations
{
    using DvdLibraryAPI2.Models;
    using DvdLibraryAPI2.Repositories;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DvdLibraryAPI2.Repositories.DvdLibraryEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DvdLibraryEntities context)
        {
            context.Dvds.AddOrUpdate(
                m => m.dvdId,
                new Dvd
                {
                    dvdId = 1,
                    title = "The Hobbit",
                    director = "Peter Jackson",
                    realeaseYear = 2012,
                    rating = "PG-13",
                    notes = "There and Back Again"
                },
                new Dvd
                {
                    dvdId = 2,
                    title = "The Fellowship of the Ring",
                    director = "Peter Jackson",
                    realeaseYear = 2001,
                    rating = "PG-13",
                    notes = "The One Ring"
                },
                new Dvd
                {
                    dvdId = 3,
                    title = "The Two Towers",
                    director = "Peter Jackson",
                    realeaseYear = 2002,
                    rating = "PG-13",
                    notes = "Minas Tirith"
                },
                new Dvd
                {
                    dvdId = 4,
                    title = "The Return of the King",
                    director = "Peter Jackson",
                    realeaseYear = 2003,
                    rating = "PG-13",
                    notes = "Mount Doom"
                }
            );

        }
    }
}
