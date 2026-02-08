import { Slider } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { useLikes } from "../../../../hooks/useLikes";
import { LIKES_RANGE } from "../../../../constants/likesRange";

const marks = {
  [LIKES_RANGE.MIN]: LIKES_RANGE.MIN,
  [LIKES_RANGE.MAX]: LIKES_RANGE.MAX,
};

export function Likes() {
  const { current, setCurrent } = useLikes();

  return (
    <Label label="Likes">
      <div className="space-y-2">
        <Slider
          className="w-full"
          marks={marks}
          step={LIKES_RANGE.STEP}
          value={current}
          defaultValue={LIKES_RANGE.CURRENT_DEFAULT}
          max={LIKES_RANGE.MAX}
          onChange={(value) => setCurrent(value)}
        />
      </div>
    </Label>
  );
}
