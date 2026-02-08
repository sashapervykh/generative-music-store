import { Select } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { DEFAULT_CONFIG } from "../../../../constants/defaultConfig";
import { useDataConfig } from "../../../../hooks/useDataConfig";

export function Language() {
  const { language, setLanguage } = useDataConfig();
  return (
    <Label label={"language"}>
      <Select
        className="w-auto"
        value={language}
        id="language"
        onChange={setLanguage}
        options={DEFAULT_CONFIG.LANGUAGE.OPTIONS}
      />
    </Label>
  );
}
