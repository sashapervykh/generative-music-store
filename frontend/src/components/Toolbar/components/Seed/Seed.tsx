import { Input } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { ReloadOutlined } from "@ant-design/icons";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import { useSongs } from "../../../../hooks/useSongs";

export function Seed() {
  const { seed, setSeed, setPage } = useDataConfig();
  const { setSongs } = useSongs();

  const handleClick = () => {
    const newSeed = getRandomSeed();
    setSongs([]);
    setSeed(newSeed);
    setPage(1);
  };

  return (
    <Label label="Seed">
      <Input
        id="Seed"
        value={seed}
        onChange={(e) => {
          const digitsOnly = e.target.value.replace(/\D/g, "");
          if (digitsOnly.length <= 20) {
            setSongs([]);
            setSeed(digitsOnly);
            setPage(1);
          }
        }}
        suffix={
          <ReloadOutlined className="cursor-pointer" onClick={handleClick} />
        }
      />
    </Label>
  );
}
