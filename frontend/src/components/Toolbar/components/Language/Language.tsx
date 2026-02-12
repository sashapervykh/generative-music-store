import { Select } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { useLocales } from "../../../../hooks/useLocales";

export function Language() {
  const { locales } = useLocales();
  const { language, setLanguage, setPage } = useDataConfig();
  return (
    <Label label={"language"}>
      <Select
        className="w-auto"
        value={language}
        id="language"
        onChange={(v) => {
          setLanguage(v);
          setPage(1);
        }}
        options={locales}
      />
    </Label>
  );
}
