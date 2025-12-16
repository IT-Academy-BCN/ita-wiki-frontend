import testLevel1 from "../../assets/testsLevel.svg";
import testLevel2 from "../../assets/testsLevel2.svg";
import testLevel3 from "../../assets/testsLevel3.svg";

export const getLevelIcon = (title: string) => {
  const hash = Array.from(title).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );

  const level = (hash % 3) + 1;

  if (level === 1) return testLevel1;
  if (level === 2) return testLevel2;
  return testLevel3;
};
