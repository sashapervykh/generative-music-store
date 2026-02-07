import { Slider } from "antd";
import { Label } from "../../../../shared/components/Label/Label";

const marks = { 0: 0, 10: 10 };

export function Likes() {
  return (
    <Label label="Likes">
      <div className="space-y-2">
        <Slider
          className="w-50"
          marks={marks}
          step={0.1}
          defaultValue={5}
          max={10}
        />
      </div>
    </Label>
  );
}
