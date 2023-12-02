namespace AOC2023.Days
{
    public static class StringExtension
    {
        // Custom string split method for fun
        public static List<string> CoolerSplit(this string input, string delimeter)
        {
            var subStrings = new List<string>();
            var subString = "";
            for (int i = 0; i < input.Length; i++)
            {
                if (input[i] == delimeter[0])
                {
                    for (int j = 0; j < delimeter.Length; j++)
                    {
                        if (input[i + j] != delimeter[j])
                        {
                            subString += input[i];
                            break;
                        }

                        // End of delimeter, cut off a substring
                        if (j == delimeter.Length - 1)
                        {
                            subStrings.Add(subString);
                            subString = "";
                            i += j;
                        }
                    }
                }
                else
                {
                    subString += input[i];
                }

                // End of input, cut off a substring
                if (i == input.Length - 1)
                {
                    subStrings.Add(subString);
                }
            }

            return subStrings;
        }
    }
}
