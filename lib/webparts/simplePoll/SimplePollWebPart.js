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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField, } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldChoiceGroupWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldChoiceGroupWithCallout';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import "@pnp/polyfill-ie11";
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'SimplePollWebPartStrings';
import SimplePoll from './components/SimplePoll';
import SPHelper from '../../Common/SPHelper';
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
var SimplePollWebPart = /** @class */ (function (_super) {
    __extends(SimplePollWebPart, _super);
    function SimplePollWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.helper = null;
        _this.userinfo = null;
        _this.openPropertyPane = function () {
            console.log("to open");
            try {
                console.log(_this.context);
                _this.context.propertyPane.open();
            }
            catch (e) {
                console.log(_this.context);
                console.log(e);
            }
        };
        return _this;
    }
    SimplePollWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onInit.call(this)];
                    case 1:
                        _b.sent();
                        sp.setup({
                            // ie11: true,
                            spfxContext: this.context
                        });
                        this.helper = new SPHelper();
                        _a = this;
                        return [4 /*yield*/, this.helper.getCurrentUserInfo()];
                    case 2:
                        _a.userinfo = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SimplePollWebPart.prototype.render = function () {
        var element = React.createElement(SimplePoll, {
            pollQuestions: this.properties.pollQuestions,
            SuccessfullVoteSubmissionMsg: this.properties.MsgAfterSubmission,
            ResponseMsgToUser: this.properties.ResponseMsgToUser,
            BtnSubmitVoteText: this.properties.BtnSubmitVoteText,
            chartType: this.properties.chartType ? this.properties.chartType : ChartType.Doughnut,
            pollBasedOnDate: this.properties.pollBasedOnDate,
            NoPollMsg: this.properties.NoPollMsg,
            currentUserInfo: this.userinfo,
            openPropertyPane: this.openPropertyPane
        });
        console.log(this.properties.pollQuestions, this.properties.pollBasedOnDate);
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(SimplePollWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    SimplePollWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(SimplePollWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    SimplePollWebPart.prototype.getPropertyPaneConfiguration = function () {
        var _this = this;
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyFieldToggleWithCallout('pollBasedOnDate', {
                                    calloutTrigger: CalloutTriggers.Hover,
                                    key: 'pollBasedOnDateFieldId',
                                    label: strings.PollDateLabel,
                                    calloutContent: React.createElement('div', {}, strings.PollDateCalloutText),
                                    onText: 'Yes',
                                    offText: 'No',
                                    checked: this.properties.pollBasedOnDate
                                }),
                                PropertyFieldCollectionData("pollQuestions", {
                                    key: "pollQuestions",
                                    label: strings.PollQuestionsLabel,
                                    panelHeader: strings.PollQuestionsPanelHeader,
                                    manageBtnLabel: strings.PollQuestionsManageButton,
                                    enableSorting: true,
                                    value: this.properties.pollQuestions,
                                    fields: [
                                        {
                                            id: "QTitle",
                                            title: strings.Q_Title_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: true,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div", null, React.createElement("textarea", {
                                                    style: { width: "220px", height: "70px" },
                                                    placeholder: strings.Q_Title_Placeholder,
                                                    key: itemId,
                                                    value: value,
                                                    onChange: function (event) {
                                                        onUpdate(field.id, event.currentTarget.value);
                                                    },
                                                })));
                                            }
                                        },
                                        {
                                            id: "QOptions",
                                            title: strings.Q_Options_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: true,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div", null, React.createElement("textarea", {
                                                    style: { width: "220px", height: "70px" },
                                                    placeholder: strings.Q_Options_Placeholder,
                                                    key: itemId,
                                                    value: value,
                                                    onChange: function (event) {
                                                        onUpdate(field.id, event.currentTarget.value);
                                                    },
                                                })));
                                            }
                                        },
                                        {
                                            id: "QMultiChoice",
                                            title: strings.MultiChoice_Title,
                                            type: CustomCollectionFieldType.boolean,
                                            defaultValue: false
                                        },
                                        {
                                            id: "QStartDate",
                                            title: strings.Q_StartDate_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: false,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement(DateTimePicker, {
                                                    key: itemId,
                                                    showLabels: false,
                                                    dateConvention: DateConvention.Date,
                                                    showGoToToday: true,
                                                    showMonthPickerAsOverlay: true,
                                                    value: value ? new Date(value) : null,
                                                    disabled: !_this.properties.pollBasedOnDate,
                                                    onChange: function (date) {
                                                        onUpdate(field.id, date);
                                                    }
                                                }));
                                            }
                                        },
                                        {
                                            id: "QEndDate",
                                            title: strings.Q_EndDate_Title,
                                            type: CustomCollectionFieldType.custom,
                                            required: false,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement(DateTimePicker, {
                                                    key: itemId,
                                                    showLabels: false,
                                                    dateConvention: DateConvention.Date,
                                                    showGoToToday: true,
                                                    showMonthPickerAsOverlay: true,
                                                    value: value ? new Date(value) : null,
                                                    disabled: !_this.properties.pollBasedOnDate,
                                                    onChange: function (date) {
                                                        onUpdate(field.id, date);
                                                    }
                                                }));
                                            }
                                        }
                                    ],
                                    disabled: false
                                }),
                                PropertyPaneTextField('MsgAfterSubmission', {
                                    label: strings.MsgAfterSubmissionLabel,
                                    description: strings.MsgAfterSubmissionDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.MsgAfterSubmissionPlaceholder,
                                    value: this.properties.MsgAfterSubmission
                                }),
                                PropertyPaneTextField('ResponseMsgToUser', {
                                    label: strings.ResponseMsgToUserLabel,
                                    description: strings.ResponseMsgToUserDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.ResponseMsgToUserPlaceholder,
                                    value: this.properties.ResponseMsgToUser
                                }),
                                PropertyPaneTextField('BtnSubmitVoteText', {
                                    label: strings.BtnSumbitVoteLabel,
                                    description: strings.BtnSumbitVoteDescription,
                                    maxLength: 50,
                                    multiline: false,
                                    resizable: false,
                                    placeholder: strings.BtnSumbitVotePlaceholder,
                                    value: this.properties.BtnSubmitVoteText
                                }),
                                PropertyPaneTextField('NoPollMsg', {
                                    label: strings.NoPollMsgLabel,
                                    description: strings.NoPollMsgDescription,
                                    maxLength: 150,
                                    multiline: true,
                                    rows: 3,
                                    resizable: false,
                                    placeholder: strings.NoPollMsgPlaceholder,
                                    value: this.properties.NoPollMsg
                                }),
                                PropertyFieldChoiceGroupWithCallout('chartType', {
                                    calloutContent: React.createElement('div', {}, strings.ChartFieldCalloutText),
                                    calloutTrigger: CalloutTriggers.Hover,
                                    key: 'choice_charttype',
                                    label: strings.ChartFieldLabel,
                                    options: [
                                        {
                                            key: 'pie',
                                            text: 'Pie',
                                            checked: this.properties.chartType === ChartType.Pie,
                                            iconProps: { officeFabricIconFontName: 'PieSingle' }
                                        }, {
                                            key: 'doughnut',
                                            text: 'Doughnut',
                                            checked: this.properties.chartType === ChartType.Doughnut,
                                            iconProps: { officeFabricIconFontName: 'DonutChart' }
                                        }, {
                                            key: 'bar',
                                            text: 'Bar',
                                            checked: this.properties.chartType === ChartType.Bar,
                                            iconProps: { officeFabricIconFontName: 'BarChartVertical' }
                                        }, {
                                            key: 'horizontalBar',
                                            text: 'Horizontal Bar',
                                            checked: this.properties.chartType === ChartType.HorizontalBar,
                                            iconProps: { officeFabricIconFontName: 'BarChartHorizontal' }
                                        }, {
                                            key: 'line',
                                            text: 'Line',
                                            checked: this.properties.chartType === ChartType.Line,
                                            iconProps: { officeFabricIconFontName: 'LineChart' }
                                        }
                                    ]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return SimplePollWebPart;
}(BaseClientSideWebPart));
export default SimplePollWebPart;
//# sourceMappingURL=SimplePollWebPart.js.map