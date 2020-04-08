using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DvdLibraryAPI2.Models
{
    public class AddDvdRequest
    {
        [Required]
        public string title { get; set; }
        public int realeaseYear { get; set; }
        public string director { get; set; }
        
        public string rating { get; set; }
        public string notes { get; set; }
    }
}