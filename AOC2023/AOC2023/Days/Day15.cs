using System.Text;

namespace AOC2023.Days
{
    internal class Day15
    {
        static string input = File.ReadAllText(
            "C:\\Users\\jakob\\Documents\\GitHub\\advent-of-code\\AOC2023\\AOC2023\\Days\\Day15.txt"
        );

        public static int HashFunction(char[] chars)
        {
            var value = 0;

            foreach (char c in chars)
            {
                value += (int)c;
                value *= 17;
                value %= 256;
            }

            return value;
        }

        public static void Part1()
        {
            var steps = input.Split(",");
            var total = 0;

            foreach (var step in steps)
            {
                var stepChars = step.ToArray();
                var value = HashFunction(stepChars);

                total += value;
            }

            Console.WriteLine($"Part 1: {total}");
        }

        public class BoxContents
        {
            public string Label = "";
            public int FocalLength = 0;
        }

        public static void Part2()
        {
            var steps = input.Split(",");
            var total = 0;

            var boxes = new Dictionary<int, List<BoxContents>>();
            for (var i = 0; i < 256; i++)
            {
                boxes[i] = new List<BoxContents>();
            }

            foreach (var step in steps)
            {
                var stepChars = step.ToArray();

                if (stepChars.Any(c => c == '-'))
                {
                    var label = step.Split("-")[0];
                    var boxNumber = HashFunction(label.ToArray());
                    var box = boxes[boxNumber];
                    var lens = box.Find(contents => contents.Label == label);

                    if (lens != null)
                    {
                        box.Remove(lens);
                    }
                }
                else if (stepChars.Any(c => c == '='))
                {
                    var label = step.Split("=")[0];
                    var boxNumber = HashFunction(label.ToArray());
                    var focalLength = int.Parse(step.Split("=")[1]);
                    var box = boxes[boxNumber];
                    var lens = box.Find(contents => contents.Label == label);

                    if (lens != null)
                    {
                        box.Insert(
                            box.IndexOf(lens),
                            new BoxContents { Label = label, FocalLength = focalLength }
                        );
                        box.Remove(lens);
                    }
                    else
                    {
                        box.Add(new BoxContents { Label = label, FocalLength = focalLength });
                    }
                }
            }

            foreach (var box in boxes)
            {
                for (var i = 0; i < box.Value.Count; i++)
                {
                    var lensTotal = 1 + box.Key;
                    lensTotal *= i + 1;
                    lensTotal *= box.Value[i].FocalLength;
                    total += lensTotal;
                }
            }

            Console.WriteLine($"Part 2: {total}");
        }
    }
}
