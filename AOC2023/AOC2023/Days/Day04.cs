using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace AOC2023.Days
{
    internal class Day04
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day04.txt"
        );

        public static void Part1()
        {
            var cards = input.Split("\r\n");
            var numberRegex = new Regex(@"[0-9]+");
            var totalPoints = 0;
            foreach (var card in cards)
            {
                var cardPoints = 0;
                var cardName = card.Split(":")[0];
                var cardNumbers = card.Split(":")[1];
                var winningNumbers = numberRegex
                    .Matches(cardNumbers.Split("|")[0])
                    .Select(m => m.Value);
                var numbersYouHave = numberRegex
                    .Matches(cardNumbers.Split("|")[1])
                    .Select(m => m.Value);

                foreach (var number in winningNumbers)
                {
                    if (numbersYouHave.Contains(number))
                    {
                        cardPoints = cardPoints == 0 ? 1 : cardPoints * 2;
                    }
                }

                totalPoints += cardPoints;
            }

            Console.WriteLine($"Part 1: {totalPoints}");
        }

        public static void Part2()
        {
            var originalCards = input
                .Split("\r\n")
                .ToDictionary(x => x.Split(":")[0].Replace(" ", ""), x => x.Split(":")[1]);
            var copyCards = originalCards.ToList();
            var numberRegex = new Regex(@"[0-9]+");

            for (var j = 0; j < copyCards.Count; j++)
            {
                var winningNumbers = numberRegex
                    .Matches(copyCards[j].Value.Split("|")[0])
                    .Select(m => m.Value);
                var numbersYouHave = numberRegex
                    .Matches(copyCards[j].Value.Split("|")[1])
                    .Select(m => m.Value);

                var matches = 0;
                foreach (var number in winningNumbers)
                {
                    if (numbersYouHave.Contains(number))
                    {
                        matches += 1;
                    }
                }

                for (var i = 1; i < matches + 1; i++)
                {
                    var currentCardNumber = numberRegex.Match(copyCards[j].Key).Value;
                    var nextCardKey = $"Card{int.Parse(currentCardNumber) + i}";
                    var nextCardValue = originalCards[nextCardKey];
                    copyCards.Add(new KeyValuePair<string, string>(nextCardKey, nextCardValue));
                }
            }

            Console.WriteLine($"Part 2: {copyCards.Count}");
        }
    }
}
