use DvdLibrary
go

IF EXISTS(
   SELECT *
   FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSelectAll')
BEGIN
   DROP PROCEDURE DvdSelectAll
END
GO
 
CREATE PROCEDURE DvdSelectAll
AS
 
    SELECT dvdId, title, realeaseYear, director, rating, notes
			FROM Dvds 
 
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSelectById')
      DROP PROCEDURE DvdSelectById
GO

CREATE PROCEDURE DvdSelectById (
	@dvdId int
)
AS
	SELECT dvdId, Title, director, realeaseYear, rating, notes
	FROM Dvds
	WHERE dvdId = @dvdId
GO

If exists(select * from INFORMATION_SCHEMA.ROUTINES
			where ROUTINE_NAME = 'DvdInsert')
			drop procedure DvdInsert
go

CREATE PROCEDURE DvdInsert (
	@DvdId int output,
	@Title varchar(50),
	@Director varchar(50),
	@RealeaseYear int,
	@Rating varchar(10),
	@Notes varchar(256)
)AS

Begin
     set identity_insert Dvds ON;
	 insert into dvds(DvdId, Title, Director, RealeaseYear, Rating, Notes)
	 Values (@DvdId, @Title, @Director, @RealeaseYear, @Rating, @Notes);
	 set identity_insert Dvds OFF;
	 Set @DvdId = SCOPE_IDENTITY();
End
GO

If exists(select * from INFORMATION_SCHEMA.ROUTINES
			where ROUTINE_NAME = 'DvdUpdate')
			drop procedure DvdUpdate
go

CREATE PROCEDURE DvdUpdate (
	@DvdId int output,
	@Title varchar(50),
	@Director varchar(50),
	@RealeaseYear int,
	@Rating varchar(10),
	@Notes varchar(256)
)
AS
Begin
	UPDATE Dvds
		SET director = @Director,
		realeaseYear = @RealeaseYear,
		title = @Title,
		rating = @Rating,
		notes = @Notes
	WHERE dvdId = @DvdId
end
GO


IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdDelete')
      DROP PROCEDURE DvdDelete
GO

CREATE PROCEDURE DvdDelete (
	@DvdId int
)
AS
	DELETE FROM Dvds
	WHERE dvdId = @DvdId
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSearchDirector')
      DROP PROCEDURE DvdSearchDirector
GO

CREATE PROCEDURE DvdSearchDirector (
	@director varchar(50)
)
AS
	SELECT dvdId, Title, director, realeaseYear, rating, notes
	FROM Dvds
	WHERE director like '%' + @director+ '%'
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSearchRating')
      DROP PROCEDURE DvdSearchRating
GO

CREATE PROCEDURE DvdSearchRating (
	@rating varchar(10)
)
AS
	SELECT dvdId, Title, director, realeaseYear, rating, notes
	FROM Dvds
	WHERE rating like '%' + @rating+ '%'
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSearchTitle')
      DROP PROCEDURE DvdSearchTitle
GO

CREATE PROCEDURE DvdSearchTitle (
	@title varchar(50)
)
AS
	SELECT dvdId, Title, director, realeaseYear, rating, notes
	FROM Dvds
	WHERE title like '%' + @title + '%'
GO

IF EXISTS(SELECT * FROM INFORMATION_SCHEMA.ROUTINES
   WHERE ROUTINE_NAME = 'DvdSearchYear')
      DROP PROCEDURE DvdSearchYear
GO

CREATE PROCEDURE DvdSearchYear (
	@releaseYear int
)
AS
	SELECT dvdId, Title, director, realeaseYear, rating, notes
	FROM Dvds
	WHERE realeaseYear like @releaseYear
GO