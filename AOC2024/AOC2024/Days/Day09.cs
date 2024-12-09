namespace AOC2024.Days;

public class Day09
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day09.txt"
    );

    public void Part01()
    {
        var fileBlocks = new List<string>();
        for (var a = 0; a < input.Length; a++)
        {
            string element;
            int count;
            if (a % 2 == 0)
            {
                element = (a / 2).ToString();
                count = (int)Char.GetNumericValue(input[a]);
            }
            else
            {
                element = ".";
                count = (int)Char.GetNumericValue(input[a]);
            }

            var file = Enumerable.Repeat(element, count);
            fileBlocks.AddRange(file);
        }

        for (var a = fileBlocks.Count - 1; a > -1; a--)
        {
            var element = fileBlocks[a];
            var indexOfFirstFreeSpace = fileBlocks.ToList().FindIndex(fb => fb == ".");
            if (indexOfFirstFreeSpace > a)
            {
                break;
            }

            fileBlocks[indexOfFirstFreeSpace] = element;
            fileBlocks[a] = ".";
        }

        Int64 checksum = 0;
        for (var a = 0; a < fileBlocks.Count; a++)
        {
            if (fileBlocks[a] == ".")
            {
                break;
            }

            var value = a * int.Parse(fileBlocks[a]);
            checksum += value;
        }

        Console.WriteLine($"Part 1: {checksum}");
    }

    public void Part02()
    {
        var blocks = new List<List<string>>();
        for (var a = 0; a < input.Length; a++)
        {
            string element;
            int count;
            if (a % 2 == 0)
            {
                element = (a / 2).ToString();
                count = (int)Char.GetNumericValue(input[a]);
            }
            else
            {
                element = ".";
                count = (int)Char.GetNumericValue(input[a]);
            }

            if (count == 0)
            {
                continue;
            }

            var block = Enumerable.Repeat(element, count).ToList();
            blocks.Add(block);
        }

        for (var a = blocks.Count - 1; a > -1; a--)
        {
            var block = blocks[a];
            if (block[0] == ".")
            {
                continue;
            }

            var indexOfFreeSpaceBlock = blocks.FindIndex(b =>
                b[0] == "." && b.Count >= block.Count
            );

            if (indexOfFreeSpaceBlock > a || indexOfFreeSpaceBlock == -1)
            {
                continue;
            }

            var freeSpaceBlock = blocks[indexOfFreeSpaceBlock];
            freeSpaceBlock.RemoveRange(0, block.Count);
            if (freeSpaceBlock.Count == 0)
            {
                blocks.Remove(freeSpaceBlock);
                a--;
            }

            blocks.Insert(indexOfFreeSpaceBlock, block);
            a++;
            blocks[a] = Enumerable.Repeat(".", block.Count).ToList();
        }

        Int64 checksum = 0;
        int counter = 0;
        for (var a = 0; a < blocks.Count; a++)
        {
            for (var b = 0; b < blocks[a].Count; b++)
            {
                if (blocks[a][b] != ".")
                {
                    var value = counter * int.Parse(blocks[a][b]);
                    checksum += value;
                }

                counter++;
            }
        }

        Console.WriteLine($"Part 2: {checksum}");
    }
}
