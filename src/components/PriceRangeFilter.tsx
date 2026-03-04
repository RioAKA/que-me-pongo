import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatARS } from "@/lib/currency";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const [localMin, setLocalMin] = useState(String(value[0]));
  const [localMax, setLocalMax] = useState(String(value[1]));

  useEffect(() => {
    setLocalMin(String(value[0]));
    setLocalMax(String(value[1]));
  }, [value]);

  const commitValues = (newMin: number, newMax: number) => {
    const cMin = Math.max(min, Math.min(newMin, max));
    const cMax = Math.max(min, Math.min(newMax, max));
    onChange([Math.min(cMin, cMax), Math.max(cMin, cMax)]);
  };

  const handleMinBlur = () => {
    const n = Number(localMin) || min;
    commitValues(n, value[1]);
  };

  const handleMaxBlur = () => {
    const n = Number(localMax) || max;
    commitValues(value[0], n);
  };

  const handleSliderChange = (vals: number[]) => {
    onChange([vals[0], vals[1]]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold mb-3">Precio</h3>

      {/* Slider */}
      <Slider
        min={min}
        max={max}
        step={100}
        value={value}
        onValueChange={handleSliderChange}
        className="mb-2"
      />

      {/* Range label */}
      <div className="flex justify-between text-xs text-muted-foreground font-body">
        <span>{formatARS(value[0])}</span>
        <span>{formatARS(value[1])}</span>
      </div>

      {/* Numeric inputs */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground font-body">Mín</Label>
          <Input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onBlur={handleMinBlur}
            onKeyDown={(e) => e.key === "Enter" && handleMinBlur()}
            min={min}
            max={max}
            className="h-8 text-sm font-body"
          />
        </div>
        <span className="text-muted-foreground mt-5">—</span>
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground font-body">Máx</Label>
          <Input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onBlur={handleMaxBlur}
            onKeyDown={(e) => e.key === "Enter" && handleMaxBlur()}
            min={min}
            max={max}
            className="h-8 text-sm font-body"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
