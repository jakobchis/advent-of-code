using System.Dynamic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using static AOC2023.Days.Day07;

namespace AOC2023.Days
{
    internal class Day07
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day07.txt"
        );

        public class Hand
        {
            public string HandCards = "";
            public int HandType;
            public int HandBid;
        }

        public static int GetHandType(List<string> hand)
        {
            if (hand.GroupBy(c => c).Where(g => g.Count() == 5).Count() == 1)
            {
                // five of a kind
                return 7;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 4).Count() == 1)
            {
                // four of a kind
                return 6;
            }
            else if (
                hand.GroupBy(c => c).Where(g => g.Count() == 3).Count() == 1
                && hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 1
            )
            {
                // full house
                return 5;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 3).Count() == 1)
            {
                // three of a kind
                return 4;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 2)
            {
                // two pair
                return 3;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 1)
            {
                // one pair
                return 2;
            }
            else
            {
                // high card
                return 1;
            }
        }

        public static void Part1()
        {
            var cardMap = new Dictionary<string, int>
            {
                { "2", 2 },
                { "3", 3 },
                { "4", 4 },
                { "5", 5 },
                { "6", 6 },
                { "7", 7 },
                { "8", 8 },
                { "9", 9 },
                { "T", 10 },
                { "J", 11 },
                { "Q", 12 },
                { "K", 13 },
                { "A", 14 }
            };
            var rows = input.Split("\r\n");
            var hands = new List<Hand>();

            foreach (var row in rows)
            {
                var handCards = row.Split(" ")[0].Select(c => c.ToString()).ToList();
                var handBid = int.Parse(row.Split(" ")[1]);
                var handType = GetHandType(handCards);

                hands.Add(
                    new Hand
                    {
                        HandCards = string.Join("", handCards),
                        HandType = handType,
                        HandBid = handBid
                    }
                );
            }

            hands.Sort(
                (first, second) =>
                {
                    if (first.HandType > second.HandType)
                        return 1;
                    if (first.HandType < second.HandType)
                        return -1;

                    for (var i = 0; i < first.HandCards.Length; i++)
                    {
                        if (
                            cardMap[first.HandCards[i].ToString()]
                            > cardMap[second.HandCards[i].ToString()]
                        )
                            return 1;
                        if (
                            cardMap[first.HandCards[i].ToString()]
                            < cardMap[second.HandCards[i].ToString()]
                        )
                            return -1;
                    }

                    // shouldn't happen
                    return 0;
                }
            );

            var total = 0;
            for (var i = 0; i < hands.Count; i++)
            {
                total += hands[i].HandBid * (i + 1);
            }

            Console.WriteLine($"Part 1: {total}");
        }

        public static void Part2()
        {
            var cardMap = new Dictionary<string, int>
            {
                { "J", 1 },
                { "2", 2 },
                { "3", 3 },
                { "4", 4 },
                { "5", 5 },
                { "6", 6 },
                { "7", 7 },
                { "8", 8 },
                { "9", 9 },
                { "T", 10 },
                { "Q", 11 },
                { "K", 12 },
                { "A", 13 }
            };
            var rows = input.Split("\r\n");
            var hands = new List<Hand>();

            foreach (var hand in rows)
            {
                var handCardsOriginal = hand.Split(" ")[0].Select(c => c.ToString()).ToList();
                var handCardsCopy = handCardsOriginal.ToList();
                var handBid = int.Parse(hand.Split(" ")[1]);

                // JJJJJ edge case
                if (!handCardsCopy.All(c => c == "J"))
                {
                    var mostCommonCard = handCardsCopy
                        .Where(c => c != "J")
                        .GroupBy(c => c)
                        .OrderByDescending(g => g.Count())
                        .First()
                        .Key;
                    handCardsCopy = string.Join("", handCardsCopy)
                        .Replace("J", mostCommonCard)
                        .Select(c => c.ToString())
                        .ToList();
                }

                var handType = GetHandType(handCardsCopy);

                hands.Add(
                    new Hand
                    {
                        HandCards = string.Join("", handCardsOriginal),
                        HandType = handType,
                        HandBid = handBid
                    }
                );
            }

            hands.Sort(
                (first, second) =>
                {
                    if (first.HandType > second.HandType)
                        return 1;
                    if (first.HandType < second.HandType)
                        return -1;

                    for (var i = 0; i < first.HandCards.Length; i++)
                    {
                        if (
                            cardMap[first.HandCards[i].ToString()]
                            > cardMap[second.HandCards[i].ToString()]
                        )
                            return 1;
                        if (
                            cardMap[first.HandCards[i].ToString()]
                            < cardMap[second.HandCards[i].ToString()]
                        )
                            return -1;
                    }

                    // shouldn't happen
                    return 0;
                }
            );

            var total = 0;
            for (var i = 0; i < hands.Count; i++)
            {
                total += hands[i].HandBid * (i + 1);
            }

            Console.WriteLine($"Part 2: {total}");
        }
    }
}
