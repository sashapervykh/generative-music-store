import { Slider } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { DEFAULT_CONFIG } from "../../../../constants/defaultConfig";

const marks = {
  [DEFAULT_CONFIG.LIKES.MIN]: DEFAULT_CONFIG.LIKES.MIN,
  [DEFAULT_CONFIG.LIKES.MAX]: DEFAULT_CONFIG.LIKES.MAX,
};

export function Likes() {
  const { likes, setLikes } = useDataConfig();

  return (
    <Label label="Likes">
      <div className="space-y-2">
        <Slider
          className="w-full"
          marks={marks}
          step={DEFAULT_CONFIG.LIKES.STEP}
          value={likes}
          defaultValue={DEFAULT_CONFIG.LIKES.DEFAULT_LIKES}
          max={DEFAULT_CONFIG.LIKES.MAX}
          onChange={(value) => setLikes(value)}
        />
      </div>
    </Label>
  );
}
