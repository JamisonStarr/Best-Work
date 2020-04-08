$(document).ready(function () {

    loadDvds();
    
    // Create Button onclick handler
    $('#create-button').click(function (event) {

        // check for errors and display any that we have
        // pass the input associated with the create form to the validation function
        var haveValidationErrors = checkAndDisplayValidationErrors($('#create-form').find('input'));

        // if we have errors, bail out by returning false
         if (haveValidationErrors) {
             return false;
        }


       
        // if we made it here, there are no errors so make the ajax call
        $.ajax({
            type: 'POST',
            url: 'https://localhost:44369/dvd',
            data: JSON.stringify({
                title: $('#create-dvd-title').val(),
                realeaseYear: $('#create-release-year').val(),
                director: $('#create-director').val(),
                rating: $('#create-rating').val(),
                notes: $('#create-notes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            success: function(data, status) {
                // clear errorMessages
                $('#errorMessages').empty();
               // Clear the form and reload the table
                $('#create-dvd-title').val('');
                $('#create-release-year').val('');
                $('#create-director').val('');
                $('#create-rating').val('');
                $('#create-notes').val('');
                loadDvds();
            },
            error: function() {
                $('#errorMessages')
                   .append($('<li>')
                   .attr({class: 'list-group-item list-group-item-danger'})
                   .text('Error calling web service.  Please try again later.'));
            }
        });
    });

    // Update Button onclick handler
    $('#edit-button').click(function (event) {

        // check for errors and display any that we have
        // pass the input associated with the edit form to the validation function
        var haveValidationErrors = checkAndDisplayValidationErrors($('#edit-form').find('input'));

        // if we have errors, bail out by returning false
        if (haveValidationErrors) {
            return false;
        }

        // if we get to here, there were no errors, so make the Ajax call
        $.ajax({
           type: 'PUT',
           url: 'https://localhost:44369/dvd/' + $('#edit-dvd-id').val(),
           data: JSON.stringify({
             dvdId: $('#edit-dvd-id').val(),
             title: $('#edit-title').val(),
             realeaseYear: $('#edit-release-year').val(),
             director: $('#edit-director').val(),
             rating: $('#edit-rating').val(),
             notes: $('#edit-notes').val()
           }),
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           'dataType': 'json',
            success: function() {
                // clear errorMessages
                $('#errorMessages').empty();
                hideEditForm();
                loadDvds();
           },
           error: function() {
             $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
           }
       })
    });
    $('#searchbutton').click(function (event) {
        selectElement =  
                    document.querySelector('#search1'); 
                      
        output = selectElement.value; 
        
        var searchId = document.getElementById("searchbox").value;
        if(output == "title")
        {
            searchByTitle(searchId);
        }
        else if(output == "releaseDate")
        {
            searchByReleaseYear(searchId);
        }
        else if(output == "director")
        {
            searchByDirector(searchId);
        }
        else if(output == "rating")
        {
            searchByRating(searchId);
        }
    });
    
});

function loadDvds() {
    // we need to clear the previous content so we don't append to it
    clearDvdTable();

    // grab the the tbody element that will hold the rows of dvd information
    var contentRows = $('#contentRows');
    
    $.ajax ({
        type: 'GET',
        url: 'https://localhost:44369/dvds',
        success: function (data, status) {
            $.each(data, function (index, dvd) {
                var title = dvd.title;
                var realeaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.dvdId;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + realeaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a onclick="deleteDvd(' + id + ')">Delete</a></td>';
                    row += '</tr>';
                contentRows.append(row);
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }
    });
}

function clearDvdTable() {
    $('#contentRows').empty();
}

function showEditForm(dvdId) {
    // clear errorMessages
    $('#errorMessages').empty();
    // get the dvd details from the server and then fill and show the
    // form on success
    $.ajax({
        type: 'GET',
        url: 'https://localhost:44369/dvd/' + dvdId,
        success: function(data, status) {
              $('#edit-title').val(data.title);
              $('#edit-release-year').val(data.realeaseYear);
              $('#edit-director').val(data.director);
              $('#edit-rating').val(data.rating);
              $('#edit-dvd-id').val(data.dvdId);
              $('#edit-notes').val(data.notes); 
              $('#editTitleHeader').text(data.title);
          },
          error: function() {
            $('#errorMessages')
               .append($('<li>')
               .attr({class: 'list-group-item list-group-item-danger'})
               .text('Error calling web service.  Please try again later.'));
          }
    });
    $('#dvdTableDiv').hide();
    $('#topBar').hide();
    $('#editFormDiv').show();
}

function showCreateForm() {
    $('#errorMessages').empty();

    $('#dvdTableDiv').hide();
    $('#topBar').hide();
    $('#createFormDiv').show();

}

function hideEditForm() {
    // clear errorMessages
    $('#errorMessages').empty();
    // clear the form and then hide it
    //$('#edit-title').val('');
    //$('#edit-release-year').val('');
   // $('#edit-director').val('');
    //$('#edit-rating').val('');
    //$('#edit-notes').val('');
    $('#editFormDiv').hide();
    $('#dvdTableDiv').show();
    $('#topBar').show();
}

function hideCreateForm() {
    $('#errorMessages').empty();

    // clear the form and then hide it
    //$('#create-title').val('');
    //$('#create-release-year').val('');
    //$('#create-director').val('');
    //$('#create-rating').val('');
    //$('#create-notes').val('');
    $('#createFormDiv').hide();
    $('#dvdTableDiv').show();
    $('#topBar').show();


}

function deleteDvd(dvdId) {
    var donut = confirm("Are you sure you want to delete this dvd from your collection?")
    if(donut)
    {
        $.ajax ({
            type: 'DELETE',
            url: "https://localhost:44369/dvd/" + dvdId,
            success: function (status) {
                loadDvds();
            }
        });
    }
}

function searchByTitle(searchId)
{
    clearDvdTable();
    $('#errorMessages').empty();

    // grab the the tbody element that will hold the rows of dvd information
    var contentRows = $('#contentRows');
    $.ajax ({
        type: 'GET',
        url: 'https://localhost:44369/dvds/title/' + searchId,
        success: function (data, status) {
            $.each(data, function (index, dvd) {
                var title = dvd.title;
                var realeaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.dvdId;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + realeaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a onclick="deleteDvd(' + id + ')">Delete</a></td>';
                    row += '</tr>';
                
                    contentRows.append(row);
                
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }
    });

}

function searchByReleaseYear(searchId)
{
    clearDvdTable();
    $('#errorMessages').empty();

    // grab the the tbody element that will hold the rows of dvd information
    var contentRows = $('#contentRows');
    $.ajax ({
        type: 'GET',
        url: 'https://localhost:44369/dvds/year/' + searchId,
        success: function (data, status) {
            $.each(data, function (index, dvd) {
                var title = dvd.title;
                var realeaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.dvdId;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + realeaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a onclick="deleteDvd(' + id + ')">Delete</a></td>';
                    row += '</tr>';
                
                    contentRows.append(row);
                
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }
    });

}

function searchByDirector(searchId)
{
    clearDvdTable();
    $('#errorMessages').empty();

    // grab the the tbody element that will hold the rows of dvd information
    var contentRows = $('#contentRows');
    $.ajax ({
        type: 'GET',
        url: 'https://localhost:44369/dvds/director/' + searchId,
        success: function (data, status) {
            $.each(data, function (index, dvd) {
                var title = dvd.title;
                var realeaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.dvdId;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + realeaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a onclick="deleteDvd(' + id + ')">Delete</a></td>';
                    row += '</tr>';
                
                    contentRows.append(row);
                
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }
    });
}

function searchByRating(searchId)
{
    clearDvdTable();
    $('#errorMessages').empty();

    // grab the the tbody element that will hold the rows of dvd information
    var contentRows = $('#contentRows');
    $.ajax ({
        type: 'GET',
        url: 'https://localhost:44369/dvds/rating/' + searchId,
        success: function (data, status) {
            $.each(data, function (index, dvd) {
                var title = dvd.title;
                var realeaseYear = dvd.realeaseYear;
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.dvdId;

                var row = '<tr>';
                    row += '<td>' + title + '</td>';
                    row += '<td>' + realeaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onclick="showEditForm(' + id + ')">Edit</a></td>';
                    row += '<td><a onclick="deleteDvd(' + id + ')">Delete</a></td>';
                    row += '</tr>';
                
                    contentRows.append(row);
                
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }
    });
}


// processes validation errors for the given input.  returns true if there
// are validation errors, false otherwise
function checkAndDisplayValidationErrors(input) {
    // clear displayed error message if there are any
    $('#errorMessages').empty();
    // check for HTML5 validation errors and process/display appropriately
    // a place to hold error messages
    var errorMessages = [];

    // loop through each input and check for validation errors
    input.each(function() {
        // Use the HTML5 validation API to find the validation errors
        if(!this.validity.valid)
        {
            var errorField = $('label[for='+this.id+']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }
    });

    // put any error messages in the errorMessages div
    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message){
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}

