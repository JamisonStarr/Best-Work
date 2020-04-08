using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DvdLibraryAPI2.Models;
using DvdLibraryAPI2.Repositories;
using DvdLibraryAPI2.Interfaces;
using System.Web.Http.Cors;

namespace DvdLibraryAPI2.Controllers
{
    public class DvdController : ApiController
    {

        private IDvdRepository repo = DvdLibraryFactory.GetRepository();

        [Route("dvds")]
        [AcceptVerbs("GET")]
        public IHttpActionResult All()
        {
            return Ok(repo.GetAll());
        }
        

        [Route("dvd/{dvdId}")]
        [AcceptVerbs("GET")]
        public IHttpActionResult Get(int dvdId)
        {
            Dvd dvd = repo.Get(dvdId);

            if (dvd == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(dvd);
            }
        }
        [Route("dvds/title/{title}")]
        [AcceptVerbs("GET")]
        public IHttpActionResult SearchByTitle(string title)
        {
            return Ok(repo.SearchTitle(title));
        }
        [Route("dvds/year/{releaseYear}")]
        [AcceptVerbs("GET")]
        public IHttpActionResult SearchByReleaseYear(int releaseYear)
        {
            return Ok(repo.SearchYear(releaseYear));
        }
        [Route("dvds/director/{director}")]
        [AcceptVerbs("GET")]
        public IHttpActionResult SearchByDirector(string director)
        {
            return Ok(repo.SearchDirector(director));
        }
        [Route("dvds/rating/{rating}")]
        [AcceptVerbs("GET")]
        public IHttpActionResult SearchByRating(string rating)
        {
            return Ok(repo.SearchRating(rating));
        }

        [Route("dvd")]
        [AcceptVerbs("POST")]
        public IHttpActionResult Add(AddDvdRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Dvd dvd = new Dvd()
            {
                title = request.title,
                realeaseYear = request.realeaseYear,
                rating = request.rating,
                director = request.director,
                notes = request.notes
            };

            repo.Add(dvd);
            return Created($"dvds/get/{dvd.dvdId}", dvd);
        }

        [Route("dvd/{id}")]
        [AcceptVerbs("PUT")]
        public IHttpActionResult Update(UpdateDvdRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Dvd dvd = repo.Get(request.dvdId);

            if (dvd == null)
            {
                return NotFound();
            }

            dvd.title = request.title;
            dvd.rating = request.rating;
            dvd.director = request.director;
            dvd.realeaseYear = request.realeaseYear;
            dvd.notes = request.notes;
            dvd.dvdId = request.dvdId;

            repo.Edit(dvd);
            return Ok(dvd);

        }

        [Route("dvd/{dvdId}")]
        [AcceptVerbs("DELETE")]
        public IHttpActionResult Delete(int dvdId)
        {
            Dvd dvd = repo.Get(dvdId);

            if (dvd == null)
            {
                return NotFound();
            }

            repo.Delete(dvdId);
            return Ok();
        }
    }
}