var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
var QuickPollChart = /** @class */ (function (_super) {
    __extends(QuickPollChart, _super);
    function QuickPollChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.charttype = null;
        _this.getChartType = function () {
            switch (_this.props.PollAnalytics.ChartType.toLocaleLowerCase()) {
                case 'pie':
                    _this.charttype = ChartType.Pie;
                    break;
                case 'doughnut':
                    _this.charttype = ChartType.Doughnut;
                    break;
                case 'bar':
                    _this.charttype = ChartType.Bar;
                    break;
                case 'horizontalbar':
                    _this.charttype = ChartType.HorizontalBar;
                    break;
                case 'line':
                    _this.charttype = ChartType.Line;
                    break;
                default:
                    _this.charttype = ChartType.Doughnut;
                    break;
            }
        };
        return _this;
    }
    QuickPollChart.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-md12 ms-sm12" },
                        React.createElement("div", { className: "ms-textAlignLeft ms-font-m-plus ms-fontWeight-semibold" }, this.props.PollAnalytics ? this.props.PollAnalytics.Question : ''))),
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-md12 ms-sm12" },
                        this.renderChart(),
                        React.createElement("button", { onClick: this.props.PropertyPane }, "QuickPole"))))));
    };
    QuickPollChart.prototype.renderChart = function () {
        var PollAnalytics = this.props.PollAnalytics;
        if (undefined !== this.props.PollAnalytics) {
            this.getChartType();
            return (this.charttype == ChartType.Line ? (React.createElement(ChartControl, { loadingtemplate: function () { return React.createElement("div", null, "Please wait..."); }, type: this.charttype, data: {
                    labels: PollAnalytics.Labels,
                    datasets: [{
                            label: 'Results',
                            data: PollAnalytics.PollResponse,
                            fill: false,
                            borderColor: "rgb(77, 139, 240)"
                        }]
                } })) : (React.createElement(ChartControl, { loadingtemplate: function () { return React.createElement("div", null, "Please wait..."); }, type: this.charttype, data: {
                    labels: PollAnalytics.Labels,
                    datasets: [{
                            label: 'Results',
                            data: PollAnalytics.PollResponse,
                        }]
                } })));
        }
    };
    return QuickPollChart;
}(React.Component));
export default QuickPollChart;
//# sourceMappingURL=QuickPollChart.js.map