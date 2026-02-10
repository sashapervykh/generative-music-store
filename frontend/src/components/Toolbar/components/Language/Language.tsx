import { Select } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { useLocales } from "../../../../hooks/useLocales";

export function Language() {
  const { locales } = useLocales();
  const { language, setLanguage } = useDataConfig();
  return (
    <Label label={"language"}>
      <Select
        className="w-auto"
        value={language}
        id="language"
        onChange={setLanguage}
        options={locales}
      />
    </Label>
  );
}
