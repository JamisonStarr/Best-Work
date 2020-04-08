If exists(select * from INFORMATION_SCHEMA.ROUTINES
			where ROUTINE_NAME = 'DbReset')
			drop procedure DbReset
go

Create Procedure	DbReset AS
BEGIN
	DELETE FROM Dvds;

	DBCC Checkident('Dvds', RESEED, 1)
	
	set identity_insert Dvds ON;

	insert into Dvds(dvdId, director, realeaseYear, title, rating, notes)
	Values (1, 'Stanley Kubrick', 1980, 'The Shining', 'R', 'Scary Movie'),
		(2, 'John Carpenter', 1982, 'The Thing', 'R', 'Too Scary'),
		(3, 'Stanley Kubrick', 1968, '2001 A Space Odyssey', 'R', '3 weird parts'),
		(4, 'Stanley Kubrick', 1971, 'Clockwork Orange', 'R', 'Too Weird');

	set identity_insert Dvds OFF;
end

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
	 insert into dvds(DvdId, Title, Director, RealeaseYear, Rating, Notes)
	 Values (@DvdId, @Title, @Director, @RealeaseYear, @Rating, @Notes);

	 Set @DvdId = SCOPE_IDENTITY();


End