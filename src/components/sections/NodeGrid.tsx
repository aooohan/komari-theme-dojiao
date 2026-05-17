import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatBytes,
  formatUptime,
  formatLastSeen,
  getOSImage,
  formatTrafficLimit,
} from "@/utils";
import type { NodeData } from "@/types/node";
import { Link } from "react-router-dom";
import { CpuIcon, MemoryStickIcon, HardDriveIcon, Info } from "lucide-react";
import Flag from "./Flag";
import { Tag } from "../ui/tag";
import { useNodeCommons } from "@/hooks/useNodeCommons";
import { SegmentedProgress } from "../ui/segmented-progress";
import { useAppConfig } from "@/config";
import { useLocale } from "@/config/hooks";
import { NodeDisplayContainer } from "./NodeDisplay";
import { useRowHeightAlignment } from "@/hooks/useRowHeightAlignment";

interface NodeGridContainerProps {
  nodes: NodeData[];
}

export const NodeGridContainer = ({
  nodes,
}: NodeGridContainerProps) => {
  useRowHeightAlignment({
    containerSelector: '[data-view-type="grid"]',
    cardSelector: '[data-card-type="grid"]',
    tagsSelector: '[data-section="tags"]',
    trafficSelector: '[data-section="traffic"]',
    enabled: true,
  });

  return (
    <NodeDisplayContainer nodes={nodes} viewType="grid">
      {(node, onShowDetails) => (
        <NodeGrid
          key={node.uuid}
          node={node}
          onShowDetails={onShowDetails}
        />
      )}
    </NodeDisplayContainer>
  );
};

interface NodeGridProps {
  node: NodeData;
  onShowDetails: () => void;
}

interface MetricRowProps {
  label: string;
  value: number;
  sub?: string;
  rightText?: string;
  className?: string;
}

const MetricRow = ({
  label,
  value,
  sub,
  rightText,
  className,
}: MetricRowProps) => (
  <div className={className}>
    <div className="flex items-baseline justify-between gap-1.5 mb-1 min-w-0">
      <span className="text-xs font-medium truncate">{label}</span>
      <span className="text-xs font-mono tabular-nums">
        {rightText ?? `${value.toFixed(0)}%`}
      </span>
    </div>
    <SegmentedProgress value={value} />
    {sub && (
      <div className="text-[10px] text-secondary-foreground mt-1 truncate">
        {sub}
      </div>
    )}
  </div>
);

export const NodeGrid = ({ node, onShowDetails }: NodeGridProps) => {
  const {
    stats,
    isOnline,
    isConfirmedOffline,
    tagList,
    cpuUsage,
    memUsage,
    diskUsage,
    expired_at,
    trafficPercentage,
  } = useNodeCommons(node);
  const { isShowHWBarInCard, gridExpiredAtDisplay, gridUptimeDisplay } =
    useAppConfig();
  const { t } = useLocale();

  const trafficLimitText = formatTrafficLimit(
    node.traffic_limit,
    node.traffic_limit_type
  );

  const cores = node.cpu_cores || 1;
  const load1 = isOnline && stats ? stats.load : undefined;
  const loadRatioPct =
    load1 !== undefined ? Math.min((load1 / cores) * 100, 100) : 0;

  const expiredLabel = t("node.expiredAt").replace(/[:：]$/, "");
  const uptimeLabel = t("node.uptime").replace(/[:：]$/, "");

  return (
    <Card
      data-card-type="grid"
      className={`flex flex-col mx-auto w-full max-w-sm ${
        isConfirmedOffline
          ? "striped-bg-red-translucent-diagonal ring-2 ring-red-500/50"
          : ""
      }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Link
          to={`/instance/${node.uuid}`}
          className="hover:underline hover:text-(--accent-11) min-w-0">
          <div className="flex items-center gap-2">
            <Flag flag={node.region}></Flag>
            <img
              src={getOSImage(node.os)}
              alt={node.os}
              className="w-6 h-6 object-contain flex-shrink-0"
              loading="lazy"
            />
            <CardTitle className="text-base font-bold truncate md:whitespace-normal md:break-words">
              {node.name}
            </CardTitle>
          </div>
        </Link>
        <button onClick={onShowDetails} className="flex-shrink-0">
          <Info className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm text-nowrap">
        <div className="flex flex-wrap gap-1 mb-2" data-section="tags">
          <Tag tags={tagList} />
        </div>
        <div className="border-t border-(--accent-4)/50 my-2"></div>
        {isShowHWBarInCard && (
          <div className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-md bg-(--accent-a2)">
            <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-center">
              <CpuIcon className="size-3.5 text-(--accent-10) flex-shrink-0" />
              <span className="font-mono tabular-nums truncate">
                {node.cpu_cores}
                <span className="text-secondary-foreground ml-0.5">C</span>
              </span>
            </div>
            <div className="w-px h-3 bg-(--accent-a4)" />
            <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-center">
              <MemoryStickIcon className="size-3.5 text-(--accent-10) flex-shrink-0" />
              <span className="font-mono tabular-nums truncate">
                {formatBytes(node.mem_total)}
              </span>
            </div>
            <div className="w-px h-3 bg-(--accent-a4)" />
            <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-center">
              <HardDriveIcon className="size-3.5 text-(--accent-10) flex-shrink-0" />
              <span className="font-mono tabular-nums truncate">
                {formatBytes(node.disk_total)}
              </span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          <MetricRow
            label={t("node.cpu")}
            value={cpuUsage}
            sub={`${node.cpu_cores} ${t("node.cores")}`}
          />
          <MetricRow
            label={t("node.mem")}
            value={memUsage}
            sub={
              node.mem_total > 0 && stats
                ? `${formatBytes(stats.ram)} / ${formatBytes(node.mem_total)}`
                : t("node.notAvailable")
            }
          />
          <MetricRow
            label={t("node.load")}
            value={loadRatioPct}
            rightText={load1 !== undefined ? load1.toFixed(2) : t("node.off")}
            sub={`${node.cpu_cores} ${t("node.cores")}`}
          />
          <MetricRow
            label={t("node.disk")}
            value={diskUsage}
            sub={
              node.disk_total > 0 && stats
                ? `${formatBytes(stats.disk)} / ${formatBytes(node.disk_total)}`
                : t("node.notAvailable")
            }
          />
        </div>
        <div className="border-t border-(--accent-4)/50 my-2"></div>
        <div
          data-section="traffic"
          className="grid grid-cols-2 gap-x-3">
          <div className="space-y-1.5 pr-3 border-r border-(--accent-4)/50">
            <div className="text-xs font-medium">{t("network_speed")}</div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-xs font-medium text-blue-500">
                {t("node.uploadPrefix")} {t("chart.upload")}
              </span>
              <span className="font-mono tabular-nums text-blue-500">
                {(() => {
                  const [num, unit] = (stats ? formatBytes(stats.net_out, true) : "- B/s").split(" ");
                  return (
                    <>
                      <span className="text-sm font-bold">{num}</span>
                      <span className="text-[10px] ml-0.5">{unit}</span>
                    </>
                  );
                })()}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-xs font-medium text-emerald-500">
                {t("node.downloadPrefix")} {t("chart.download")}
              </span>
              <span className="font-mono tabular-nums text-emerald-500">
                {(() => {
                  const [num, unit] = (stats ? formatBytes(stats.net_in, true) : "- B/s").split(" ");
                  return (
                    <>
                      <span className="text-sm font-bold">{num}</span>
                      <span className="text-[10px] ml-0.5">{unit}</span>
                    </>
                  );
                })()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center text-center h-full">
            <div className="flex items-baseline justify-between gap-1 w-full">
              <span className="text-xs font-medium">{t("node.traffic")}</span>
              <span className="text-[10px] font-mono tabular-nums text-secondary-foreground truncate">
                {node.traffic_limit !== 0 ? trafficLimitText : "∞"}
              </span>
            </div>
            <div className="flex-1 w-full flex flex-col items-center justify-center space-y-1.5">
              {node.traffic_limit !== 0 &&
                (() => {
                  const up = stats?.net_total_up ?? 0;
                  const down = stats?.net_total_down ?? 0;
                  return (
                    <SegmentedProgress
                      value={trafficPercentage}
                      stacked={{ up, down }}
                    />
                  );
                })()}
              <div className="flex items-baseline justify-center gap-2 min-w-0 w-full">
                <span className="font-mono tabular-nums text-blue-500 truncate">
                  <span className="text-xs font-medium mr-0.5">
                    {t("node.uploadPrefix")}
                  </span>
                  {(() => {
                    const [num, unit] = (stats
                      ? formatBytes(stats.net_total_up)
                      : "- B"
                    ).split(" ");
                    return (
                      <>
                        <span className="text-xs font-bold">{num}</span>
                        <span className="text-[9px] ml-0.5">{unit}</span>
                      </>
                    );
                  })()}
                </span>
                <span className="font-mono tabular-nums text-emerald-500 truncate">
                  <span className="text-xs font-medium mr-0.5">
                    {t("node.downloadPrefix")}
                  </span>
                  {(() => {
                    const [num, unit] = (stats
                      ? formatBytes(stats.net_total_down)
                      : "- B"
                    ).split(" ");
                    return (
                      <>
                        <span className="text-xs font-bold">{num}</span>
                        <span className="text-[9px] ml-0.5">{unit}</span>
                      </>
                    );
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
        {(() => {
          const showExpiry =
            gridExpiredAtDisplay === "show" ||
            (gridExpiredAtDisplay === "hideUnset" &&
              expired_at !== t("node.notSet"));
          const showUptime =
            gridUptimeDisplay === "show" ||
            (gridUptimeDisplay === "hideUnset" &&
              (isOnline ? stats : stats?.time));
          if (!showExpiry && !showUptime) return null;
          return (
            <>
              <div className="border-t border-(--accent-4)/50 my-2"></div>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                {showExpiry && (
                  <div className="inline-flex items-center gap-1.5 min-w-0">
                    <span className="text-secondary-foreground flex-shrink-0">
                      {expiredLabel}
                    </span>
                    <span className="font-mono tabular-nums truncate">
                      {expired_at}
                    </span>
                  </div>
                )}
                {showUptime && (
                  <div
                    className={`inline-flex items-center gap-1.5 min-w-0 ${
                      showExpiry ? "ml-auto" : ""
                    }`}>
                    <span className="text-secondary-foreground flex-shrink-0">
                      {uptimeLabel}
                    </span>
                    <span className="font-mono tabular-nums truncate">
                      {isOnline && stats
                        ? formatUptime(stats.uptime)
                        : stats?.time
                        ? formatLastSeen(stats.time)
                        : t("node.offline")}
                    </span>
                  </div>
                )}
              </div>
            </>
          );
        })()}
      </CardContent>
    </Card>
  );
};
