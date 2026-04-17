import { useMemo } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import * as XLSX from "xlsx";
import type { DisneyCharacter } from "../types/disney";
import { useTheme } from "../theme/ThemeContext";
import { ExportIcon } from "./icons";

interface FilmsPieChartProps {
  characters: DisneyCharacter[];
  hoveredCharacterId: number | null;
}

const FilmsPieChart = ({ characters, hoveredCharacterId }: FilmsPieChartProps) => {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const chartData = useMemo(
    () =>
      characters.filter((c) => c.films.length > 0).map((c) => ({
        id: c._id,
        name: c.name,
        y: c.films.length,
        films: c.films,
      })),
    [characters],
  );

  const hasData = chartData.length > 0;
  const options: Highcharts.Options = useMemo(() => {
    const tooltipBg = isNight ? "#1f2937" : "#ffffff";
    const tooltipBorder = isNight ? "#374151" : "#e2e8f0";
    const tooltipTitle = isNight ? "#fff" : "#0f172a";
    const tooltipMuted = isNight ? "#9ca3af" : "#64748b";
    const tooltipItem = isNight ? "#d1d5db" : "#334155";

    return {
      chart: {
        type: "pie",
        backgroundColor: "transparent",
        style: { fontFamily: "inherit" },
        animation: { duration: 400 },
      },
      title: { text: undefined },
      credits: { enabled: false },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const point = this as Highcharts.Point & { films: string[] };
          const filmsList = point.films
            .map((f: string) => `<li style="margin:2px 0;color:${tooltipItem}">${f}</li>`)
            .join("");
          return `
          <div style="background:${tooltipBg};border:1px solid ${tooltipBorder};border-radius:8px;padding:10px 12px;min-width:180px">
            <div style="font-weight:600;color:${tooltipTitle};margin-bottom:4px">${this.name}</div>
            <div style="color:${tooltipMuted};font-size:12px;margin-bottom:6px">
              ${this.y} film${(this.y ?? 0) > 1 ? "s" : ""} &bull; ${(this.percentage ?? 0).toFixed(1)}%
            </div>
            <ul style="margin:0;padding:0 0 0 12px;font-size:11px">${filmsList}</ul>
          </div>
        `;
        },
        outside: true,
        borderWidth: 0,
        shadow: false,
        padding: 0,
        backgroundColor: "none",
      },
      plotOptions: {
        pie: {
          dataLabels: { enabled: false },
          allowPointSelect: true,
          cursor: "pointer",
          borderWidth: 0.5,
          borderRadius: 4,
          showInLegend: false,
          innerSize: "40%",
        },
      },
      series: [
        {
          type: "pie",
          name: "Films",
          data: chartData.map((point) => {
            const isHighlighted = hoveredCharacterId === point.id;
            return {
              ...point,
              sliced: isHighlighted,
              selected: isHighlighted,
              borderWidth: isHighlighted ? 3 : 0.5,
              borderColor: isHighlighted ? (isNight ? "#93c5fd" : "#1d4ed8") : undefined,
            };
          }),
          colors: [
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
            "#10b981",
            "#06b6d4",
            "#f97316",
            "#84cc16",
            "#6366f1",
            "#14b8a6",
          ],
        },
      ],
      responsive: {
        rules: [
          {
            condition: { maxWidth: 400 },
            chartOptions: {
              plotOptions: {
                pie: {
                  allowPointSelect: false,
                  cursor: "default",
                },
              },
            },
          },
        ],
      },
    };
  }, [chartData, hoveredCharacterId, isNight]);

  const handleExportXLSX = () => {
    const rows = chartData.map((item) => ({
      "Character Name": item.name,
      "Film Count": item.y,
      Films: item.films.join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Films Data");

    const colWidths = [{ wch: 30 }, { wch: 12 }, { wch: 80 }];
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, "disney-films-chart.xlsx");
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Films per Character</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-gray-500">
            Current page · {chartData.length} character{chartData.length !== 1 ? "s" : ""} with films
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportXLSX}
          disabled={!hasData}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <ExportIcon className="h-4 w-4" />
          Export XLSX
        </button>
      </div>

      {hasData ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <div className="flex h-48 items-center justify-center text-sm text-slate-500 dark:text-gray-600">
          No film data for this page
        </div>
      )}
    </div>
  );
};

export default FilmsPieChart;
