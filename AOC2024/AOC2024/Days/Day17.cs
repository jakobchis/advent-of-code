namespace AOC2024.Days;

public class Day17
{
    private string input = File.ReadAllText(
        "/Users/jakobchisholm/Code/advent-of-code/AOC2024/AOC2024/Days/Day17.txt"
    );

    // PART 1
    public void Part01()
    {
        var aReg = int.Parse(input.Split("\n")[0].Replace("Register A: ", ""));
        var bReg = int.Parse(input.Split("\n")[1].Replace("Register B: ", ""));
        var cReg = int.Parse(input.Split("\n")[2].Replace("Register C: ", ""));
        var instructionPointer = 0;
        var program = input
            .Split("\n")[4]
            .Replace("Program: ", "")
            .Split(",")
            .Select(int.Parse)
            .ToList();
        var programOutput = new List<int>();

        Func<int, int> getComboOperand = operand =>
            operand switch
            {
                0 => 0,
                1 => 1,
                2 => 2,
                3 => 3,
                4 => aReg,
                5 => bReg,
                6 => cReg,
            };

        Func<int, int, int> doInstruction = (opcode, operand) =>
        {
            switch (opcode)
            {
                // adv
                case 0:
                    aReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
                // bxl
                case 1:
                    bReg = bReg ^ operand;
                    instructionPointer += 2;
                    break;
                // bst
                case 2:
                    bReg = getComboOperand(operand) % 8;
                    instructionPointer += 2;
                    break;
                // jnz
                case 3:
                    if (aReg != 0)
                    {
                        instructionPointer = operand;
                    }
                    else
                    {
                        instructionPointer += 2;
                    }
                    break;
                // bxc
                case 4:
                    bReg = bReg ^ cReg;
                    instructionPointer += 2;
                    break;
                // out
                case 5:
                    programOutput.Add(getComboOperand(operand) % 8);
                    instructionPointer += 2;
                    break;
                // adv
                case 6:
                    bReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
                // cdv
                case 7:
                    cReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
            }

            return 0;
        };

        while (true)
        {
            if (instructionPointer >= program.Count - 1)
                break;

            doInstruction(program[instructionPointer], program[instructionPointer + 1]);
        }

        Console.WriteLine($"Part 1: {String.Join(',', programOutput)}");
    }

    // PART 2
    public void Part02()
    {
        var aReg = int.Parse(input.Split("\n")[0].Replace("Register A: ", ""));
        var bReg = int.Parse(input.Split("\n")[1].Replace("Register B: ", ""));
        var cReg = int.Parse(input.Split("\n")[2].Replace("Register C: ", ""));
        var instructionPointer = 0;
        var program = input
            .Split("\n")[4]
            .Replace("Program: ", "")
            .Split(",")
            .Select(int.Parse)
            .ToList();
        var programOutput = new List<int>();

        Func<int, int> getComboOperand = operand =>
            operand switch
            {
                0 => 0,
                1 => 1,
                2 => 2,
                3 => 3,
                4 => aReg,
                5 => bReg,
                6 => cReg,
            };

        Func<int, int, int> doInstruction = (opcode, operand) =>
        {
            switch (opcode)
            {
                // adv
                case 0:
                    aReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
                // bxl
                case 1:
                    bReg = bReg ^ operand;
                    instructionPointer += 2;
                    break;
                // bst
                case 2:
                    bReg = getComboOperand(operand) % 8;
                    instructionPointer += 2;
                    break;
                // jnz
                case 3:
                    if (aReg != 0)
                    {
                        instructionPointer = operand;
                    }
                    else
                    {
                        instructionPointer += 2;
                    }
                    break;
                // bxc
                case 4:
                    bReg = bReg ^ cReg;
                    instructionPointer += 2;
                    break;
                // out
                case 5:
                    programOutput.Add(getComboOperand(operand) % 8);
                    instructionPointer += 2;
                    break;
                // adv
                case 6:
                    bReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
                // cdv
                case 7:
                    cReg = aReg / (int)Math.Pow(2, getComboOperand(operand));
                    instructionPointer += 2;
                    break;
            }

            return 0;
        };

        var aRegCounter = 1;
        while (true)
        {
            if (String.Join(',', programOutput) == String.Join(',', program))
            {
                break;
            }

            programOutput.Clear();
            aReg = aRegCounter;
            Console.WriteLine($"Trying aReg={aReg}");
            aRegCounter++;
            instructionPointer = 0;

            while (true)
            {
                if (instructionPointer >= program.Count - 1)
                    break;

                doInstruction(program[instructionPointer], program[instructionPointer + 1]);
            }
        }

        Console.WriteLine($"Part 2: {aReg}");
    }
}
