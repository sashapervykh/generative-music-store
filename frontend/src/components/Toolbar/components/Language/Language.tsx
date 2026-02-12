import { Select } from "antd";
import { Label } from "../../../../shared/components/Label/Label";
import { useDataConfig } from "../../../../hooks/useDataConfig";
import { useLocales } from "../../../../hooks/useLocales";
import { useSongs } from "../../../../hooks/useSongs";

export function Language() {
  const { locales } = useLocales();
  const { language, setLanguage, setPage } = useDataConfig();
  const { setSongs } = useSongs();
  return (
    <Label label={"language"}>
      <Select
        className="w-auto"
        value={language}
        id="language"
        onChange={(v) => {
          setLanguage(v);
          setPage(1);
          setSongs([]);
        }}
        options={locales}
      />
    </Label>
  );
}
