using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DvdLibraryAPI2.Models
{
    public class UpdateDvdRequest
    {
        
        public int dvdId { get; set; }

        [Required]
        public string title { get; set; }

        
        public string rating { get; set; }
        public string director { get; set; }
        public string notes { get; set; }

        public int realeaseYear { get; set; }
    }
}