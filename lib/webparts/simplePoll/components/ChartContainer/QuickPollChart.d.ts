import * as React from 'react';
import { IPollAnalyticsInfo } from '../../../../Models';
export interface IQuickPollChartProps {
    PollAnalytics: IPollAnalyticsInfo;
    PropertyPane: any;
}
export default class QuickPollChart extends React.Component<IQuickPollChartProps, {}> {
    private charttype;
    render(): React.ReactElement<IQuickPollChartProps>;
    private renderChart;
    private getChartType;
}
//# sourceMappingURL=QuickPollChart.d.ts.map