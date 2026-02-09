import { Input } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { ReloadOutlined } from "@ant-design/icons";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { getRandomSeed } from "../../../../utils/getRandomSeed";

export function Seed() {
  const { seed, setSeed } = useDataConfig();

  const handleClick = () => {
    const newSeed = getRandomSeed();
    setSeed(newSeed);
  };

  return (
    <Label label="Seed">
      <Input
        id="Seed"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        suffix={
          <ReloadOutlined className="cursor-pointer" onClick={handleClick} />
        }
      />
    </Label>
  );
}
