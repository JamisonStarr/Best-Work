USE master
Go

if exists(select * from sys.databases where name = 'DvdLibrary')
Drop DATABASE DvdLibrary
Go

Create Database DvdLibrary
Go

Use DvdLibrary 
Go

if exists(select * From sys.Tables where name = 'Dvds')
Drop table Dvds
Go

CREATE TABLE Dvds (
	dvdId int identity(1,1) not null primary key,
	title varchar(50) not null,
	director varchar(50) not null,
	realeaseYear int not null,
	rating varchar(10),
	notes varchar(256)
)