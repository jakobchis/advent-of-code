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

        public static int GetHandType(string[] hand)
        {
            if (hand.GroupBy(c => c).Where(g => g.Count() == 5).Count() == 1)
            {
                //return "five of a kind";
                return 7;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 4).Count() == 1)
            {
                //return "four of a kind";
                return 6;
            }
            else if (
                hand.GroupBy(c => c).Where(g => g.Count() == 3).Count() == 1
                && hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 1
            )
            {
                //return "full house";
                return 5;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 3).Count() == 1)
            {
                //return "three of a kind";
                return 4;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 2)
            {
                //return "two pair";
                return 3;
            }
            else if (hand.GroupBy(c => c).Where(g => g.Count() == 2).Count() == 1)
            {
                //return "one pair";
                return 2;
            }
            else
            {
                //return "high card";
                return 1;
            }
        }

        public class SortedHand
        {
            public string Hand;
            public int HandType;
            public int Bid;
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
            var handsWithBids = input.Split("\r\n");
            List<SortedHand> sortedHands = new List<SortedHand>();

            foreach (var handWithBid in handsWithBids)
            {
                string[] hand = handWithBid.Split(" ")[0].Select(c => c.ToString()).ToArray();
                int bid = int.Parse(handWithBid.Split(" ")[1]);
                int type = GetHandType(hand);

                sortedHands.Add(
                    new SortedHand
                    {
                        Hand = string.Join("", hand),
                        HandType = type,
                        Bid = bid
                    }
                );
            }

            sortedHands.Sort(
                (first, second) =>
                {
                    if (first.HandType > second.HandType)
                        return 1;
                    if (first.HandType < second.HandType)
                        return -1;

                    for (int i = 0; i < first.Hand.Length; i++)
                    {
                        if (cardMap[first.Hand[i].ToString()] > cardMap[second.Hand[i].ToString()])
                            return 1;
                        if (cardMap[first.Hand[i].ToString()] < cardMap[second.Hand[i].ToString()])
                            return -1;
                    }

                    // shouldn't happen
                    return 0;
                }
            );

            int total = 0;
            for (int i = 0; i < sortedHands.Count; i++)
            {
                total += sortedHands[i].Bid * (i + 1);
            }

            Console.WriteLine($"Part 1: {total}");
        }

        public static void Part2()
        {
            //Console.WriteLine($"Part 2: {copyCards.Count}");
        }
    }
}
