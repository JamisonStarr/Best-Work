using DvdLibraryAPI2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DvdLibraryAPI2.Interfaces
{
    public interface IDvdRepository
    {
        List<Dvd> GetAll();
        List<Dvd> SearchTitle(string title);
        List<Dvd> SearchDirector(string director);
        List<Dvd> SearchYear(int releaseYear);
        List<Dvd> SearchRating(string rating);
        Dvd Get(int dvdId);
        void Add(Dvd dvd);
        void Edit(Dvd dvd);
        void Delete(int dvdId);
        
    }
}

