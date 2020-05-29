using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleShip.BLL.Ships;
using BattleShip.BLL.GameLogic;
using BattleShip.BLL.Requests;
using BattleShip.BLL.Responses;

namespace BattleShip.UI
{
    public class Input
    {

        public string getPlayerName(int playerNumber)
        {
            Console.WriteLine("Please enter your name, player {0}: ", playerNumber);
            string newName = Console.ReadLine();
            while (String.IsNullOrEmpty(newName))
            {
                Console.WriteLine("Enter in a name: ");
                newName = Console.ReadLine();
            }
            Console.Clear();
            return newName;
        }

        public void placeShipsInput(Board playerBoard, int playerNumber)
        {
            int xValue;
            int yValue;
            bool verified;
            
            PlaceShipRequest newShipRequest = new PlaceShipRequest();
            ShipPlacement checkShip = new ShipPlacement();
            foreach (var item in Enum.GetValues(typeof(ShipType)))
            {
                verified = false;
                while (verified == false)
                {
                    

                    Console.WriteLine($"Player {playerNumber}, please enter the coordinates for your {item}.");
                    xValue = getXCoordinate();
                    yValue = getYCoordinate();
                    newShipRequest.Coordinate = coordinate(xValue, yValue);
                    newShipRequest.Direction = directionType();
                    newShipRequest.ShipType = (ShipType)item;
                    //place a ship and repeat if ship does not fit
                    checkShip = playerBoard.PlaceShip(newShipRequest);
                    if (checkShip == ShipPlacement.NotEnoughSpace)
                    {
                        Console.WriteLine("There is not enough space for that ship.");

                    }
                    else if (checkShip == ShipPlacement.Overlap)
                    {
                        Console.WriteLine("There is already a ship there!");

                    }
                    else if (checkShip == ShipPlacement.Ok)
                    {
                        Console.WriteLine();
                        verified = true;
                    }
                }
            }
            Console.Clear();
            Console.WriteLine("Press any key when you are ready to begin, Player {0}.", playerNumber);
            Console.ReadKey();
        }

        public Coordinate coordinate(int value, int index)
        {
            Coordinate newCoordinate = new Coordinate(value, index);

            newCoordinate.XCoordinate = value;
            newCoordinate.YCoordinate = index;
            return newCoordinate;
        }

        public ShipDirection directionType()
        {
            string input;
            ShipDirection directionOutput;
            int direction;
            Console.WriteLine("Finally, which direction will your ship be facing? up(1), down(2), left(3), right(4).");
            input = Console.ReadLine();
            while (!int.TryParse(input, out direction) || direction > 4 || direction < 1)
            {
                Console.WriteLine("Please enter an integer value, between 1 and 4: ");
                input = Console.ReadLine();
            }

            if (direction == 1)
                directionOutput = ShipDirection.Up;
            else if (direction == 2)
                directionOutput = ShipDirection.Down;
            else if (direction == 3)
                directionOutput = ShipDirection.Left;
            else
                directionOutput = ShipDirection.Right;
            return directionOutput;
        }
        public int getXCoordinate()
        {
            string input;
            int value;
            Console.WriteLine("Enter your x-coordinate: ");
            //TryParse for number input, 0-9
            input = Console.ReadLine();
            while (!int.TryParse(input, out value) || value > 9 || value < 0)
            {
                Console.WriteLine("Please enter an integer value, between 0 and 9: ");
                input = Console.ReadLine();
            }
            return value;
        }

        public int getYCoordinate()
        {
            string input;
            int index;
            char letter;
            Console.WriteLine("Now enter your y-coordinate: ");
            //TryParse for letter input, A-J
            input = Console.ReadLine();
            while (!(Char.TryParse(input, out letter)) || letter > 'J' || letter < 'A')
            {
                Console.WriteLine("Please enter a single character between A and J: ");
                input = Console.ReadLine();
            }
            index = ((int)char.ToUpper(letter)) - 64;
            return index;
        }
        
    }
}
