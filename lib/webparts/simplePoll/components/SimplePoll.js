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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
//import styles from './SimplePoll.module.scss';
import './SimplePoll.scss';
import * as strings from 'SimplePollWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import OptionsContainer from './OptionsContainer/OptionsContainer';
import MessageContainer from './MessageContainer/MessageContainer';
import QuickPollChart from './ChartContainer/QuickPollChart';
import SPHelper from '../../../Common/SPHelper';
import { MessageScope } from '../../../Common/enumHelper';
import * as _ from 'lodash';
import * as moment from 'moment';
import MyTrainings from './MyTrainings';
import { MyTasks } from './MyTasks';
var SimplePoll = /** @class */ (function (_super) {
    __extends(SimplePoll, _super);
    function SimplePoll(props) {
        var _this = _super.call(this, props) || this;
        _this.helper = null;
        _this.componentDidMount = function () {
            {
                console.log("iam here");
            }
            _this.checkAndCreateList();
        };
        _this.componentDidUpdate = function (prevProps) {
            if (prevProps.pollQuestions !== _this.props.pollQuestions || prevProps.pollBasedOnDate !== _this.props.pollBasedOnDate) {
                _this.setState({
                    UserResponse: [],
                    displayQuestion: null,
                    displayQuestionId: ''
                }, function () {
                    _this.getQuestions(_this.props.pollQuestions);
                });
            }
            if (prevProps.chartType !== _this.props.chartType) {
                var newPollAnalytics = _this.state.PollAnalytics;
                newPollAnalytics.ChartType = _this.props.chartType;
                _this.setState({
                    PollAnalytics: newPollAnalytics
                }, _this.bindResponseAnalytics);
            }
        };
        _this.getQuestions = function (questions) {
            var pquestions = [];
            var tmpQuestions = (questions) ? questions : (_this.props.pollQuestions) ? _this.props.pollQuestions : [];
            if (tmpQuestions && tmpQuestions.length > 0) {
                tmpQuestions.map(function (question) {
                    pquestions.push({
                        Id: question.uniqueId,
                        DisplayName: question.QTitle,
                        Choices: question.QOptions,
                        UseDate: question.QUseDate,
                        StartDate: new Date(question.QStartDate),
                        EndDate: new Date(question.QEndDate),
                        MultiChoice: question.QMultiChoice,
                        SortIdx: question.sortIdx
                    });
                });
            }
            _this.disQuestionId = _this.getDisplayQuestionID(pquestions);
            _this.setState({ PollQuestions: pquestions, displayQuestionId: _this.disQuestionId, displayQuestion: _this.displayQuestion }, _this.bindPolls);
        };
        _this.getDisplayQuestionID = function (questions) {
            var filQuestions = [];
            if (questions.length > 0) {
                if (_this.props.pollBasedOnDate) {
                    filQuestions = _.filter(questions, function (o) { return moment().startOf('date') >= moment(o.StartDate) && moment(o.EndDate) >= moment().startOf('date'); });
                }
                else {
                    filQuestions = _.orderBy(questions, ['SortIdx'], ['asc']);
                    _this.displayQuestion = filQuestions[0];
                    return filQuestions[0].Id;
                }
                if (filQuestions.length > 0) {
                    filQuestions = _.orderBy(filQuestions, ['SortIdx'], ['asc']);
                    _this.displayQuestion = filQuestions[0];
                    return filQuestions[0].Id;
                }
                else {
                    _this.displayQuestion = null;
                }
            }
            return '';
        };
        _this.bindPolls = function () {
            _this.setState({
                showProgress: (_this.state.PollQuestions.length > 0) ? true : false,
                enableSubmit: true,
                enableChoices: true,
                showOptions: false,
                showChart: false,
                showChartProgress: false,
                PollAnalytics: undefined,
                showMessage: false,
                isError: false,
                MsgContent: "",
                showSubmissionProgress: false
            }, _this.getAllUsersResponse);
        };
        _this._onChange = function (ev, option, isMultiSel) {
            var prevUserResponse = _this.state.UserResponse;
            var userresponse;
            userresponse = {
                PollQuestionId: _this.state.displayQuestion.Id,
                PollQuestion: _this.state.displayQuestion.DisplayName,
                PollResponse: !isMultiSel ? option.key : '',
                UserID: _this.props.currentUserInfo.ID,
                UserDisplayName: _this.props.currentUserInfo.DisplayName,
                UserLoginName: _this.props.currentUserInfo.LoginName,
                PollMultiResponse: isMultiSel ? option.key : [],
                IsMulti: isMultiSel
            };
            if (prevUserResponse.length > 0) {
                var filRes = _this.getUserResponse(prevUserResponse);
                if (filRes.length > 0) {
                    !isMultiSel ? filRes[0].PollResponse = option.key : filRes[0].PollMultiResponse = option.key;
                }
                else {
                    prevUserResponse.push(userresponse);
                }
            }
            else {
                prevUserResponse.push(userresponse);
            }
            _this.setState(__assign(__assign({}, _this.state), { UserResponse: prevUserResponse }));
        };
        _this._getSelectedKey = function () {
            var selKey = "";
            if (_this.state.UserResponse && _this.state.UserResponse.length > 0) {
                var userResponses = _this.state.UserResponse;
                var userRes = _this.getUserResponse(userResponses);
                if (userRes.length > 0) {
                    selKey = userRes[0].PollResponse;
                }
            }
            return selKey;
        };
        _this._submitVote = function () { return __awaiter(_this, void 0, void 0, function () {
            var curUserRes, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState(__assign(__assign({}, this.state), { enableSubmit: false, enableChoices: false, showSubmissionProgress: false, isError: false, MsgContent: '', showMessage: false }));
                        curUserRes = this.getUserResponse(this.state.UserResponse);
                        if (!(curUserRes.length <= 0)) return [3 /*break*/, 1];
                        this.setState({
                            MsgContent: strings.SubmitValidationMessage,
                            isError: true,
                            showMessage: true,
                            enableSubmit: true,
                            enableChoices: true,
                        });
                        return [3 /*break*/, 5];
                    case 1:
                        this.setState(__assign(__assign({}, this.state), { enableSubmit: false, enableChoices: false, showSubmissionProgress: true, isError: false, MsgContent: '', showMessage: false }));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.helper.submitResponse(curUserRes[0])];
                    case 3:
                        _a.sent();
                        this.setState(__assign(__assign({}, this.state), { showSubmissionProgress: false, showMessage: true, isError: false, MsgContent: (this.props.SuccessfullVoteSubmissionMsg && this.props.SuccessfullVoteSubmissionMsg.trim()) ?
                                this.props.SuccessfullVoteSubmissionMsg.trim() : strings.SuccessfullVoteSubmission, showChartProgress: true }), this.getAllUsersResponse);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        this.setState(__assign(__assign({}, this.state), { enableSubmit: true, enableChoices: true, showSubmissionProgress: false, showMessage: true, isError: true, MsgContent: strings.FailedVoteSubmission }));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.getAllUsersResponse = function () { return __awaiter(_this, void 0, void 0, function () {
            var usersResponse, filRes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.helper.getPollResponse((this.state.displayQuestionId) ? this.state.displayQuestionId : this.disQuestionId)];
                    case 1:
                        usersResponse = _a.sent();
                        filRes = _.filter(usersResponse, function (o) { return o.UserID == _this.props.currentUserInfo.ID; });
                        if (filRes.length > 0) {
                            this.setState({
                                showChartProgress: true,
                                showChart: true,
                                showOptions: false,
                                showProgress: false,
                                UserResponse: usersResponse,
                                currentPollResponse: filRes[0].Response ? filRes[0].Response : filRes[0].MultiResponse.join(',')
                            }, this.bindResponseAnalytics);
                        }
                        else {
                            this.setState({
                                showProgress: false,
                                showOptions: true,
                                showChartProgress: false,
                                showChart: false
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.bindResponseAnalytics = function () {
            var _a = _this.state, PollQuestions = _a.PollQuestions, displayQuestion = _a.displayQuestion;
            var tmpUserResponse = _this.state.UserResponse;
            if (tmpUserResponse && tmpUserResponse.length > 0) {
                var tempData;
                var qChoices = displayQuestion.Choices.split(',');
                var finalData = [];
                if (!displayQuestion.MultiChoice) {
                    tempData = _.countBy(tmpUserResponse, 'Response');
                }
                else {
                    var data = [];
                    tmpUserResponse.map(function (res) {
                        if (res.MultiResponse && res.MultiResponse.length > 0) {
                            res.MultiResponse.map(function (finres) {
                                data.push({
                                    "UserID": res.UserID,
                                    "Response": finres.trim()
                                });
                            });
                        }
                    });
                    tempData = _.countBy(data, 'Response');
                }
                qChoices.map(function (label) {
                    if (tempData[label.trim()] == undefined) {
                        finalData.push(0);
                    }
                    else
                        finalData.push(tempData[label.trim()]);
                });
                var pollAnalytics;
                pollAnalytics = {
                    ChartType: _this.props.chartType,
                    Labels: qChoices,
                    Question: displayQuestion.DisplayName,
                    PollResponse: finalData
                };
                _this.setState({
                    showProgress: false,
                    showOptions: false,
                    showChartProgress: false,
                    showChart: true,
                    PollAnalytics: pollAnalytics
                });
            }
        };
        _this.state = {
            listExists: false,
            PollQuestions: [],
            UserResponse: [],
            displayQuestionId: "",
            displayQuestion: null,
            enableSubmit: true,
            enableChoices: true,
            showOptions: false,
            showProgress: false,
            showChart: false,
            showChartProgress: false,
            PollAnalytics: undefined,
            showMessage: false,
            isError: false,
            MsgContent: "",
            showSubmissionProgress: false,
            currentPollResponse: ""
        };
        _this.helper = new SPHelper();
        return _this;
    }
    SimplePoll.prototype.checkAndCreateList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listCreated;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.helper = new SPHelper();
                        return [4 /*yield*/, this.helper.checkListExists()];
                    case 1:
                        listCreated = _a.sent();
                        if (listCreated) {
                            this.setState({ listExists: true }, function () {
                                _this.getQuestions();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SimplePoll.prototype.getUserResponse = function (UserResponses) {
        var _this = this;
        var retUserResponse;
        retUserResponse = UserResponses.filter(function (res) { return res.UserID == _this.props.currentUserInfo.ID; });
        return retUserResponse;
    };
    SimplePoll.prototype.render = function () {
        var _a = this.props, pollQuestions = _a.pollQuestions, BtnSubmitVoteText = _a.BtnSubmitVoteText, ResponseMsgToUser = _a.ResponseMsgToUser, NoPollMsg = _a.NoPollMsg;
        var _b = this.state, showProgress = _b.showProgress, enableChoices = _b.enableChoices, showSubmissionProgress = _b.showSubmissionProgress, showChartProgress = _b.showChartProgress, PollQuestions = _b.PollQuestions, showMessage = _b.showMessage, MsgContent = _b.MsgContent, isError = _b.isError, showOptions = _b.showOptions, showChart = _b.showChart, PollAnalytics = _b.PollAnalytics, currentPollResponse = _b.currentPollResponse, enableSubmit = _b.enableSubmit, listExists = _b.listExists, displayQuestion = _b.displayQuestion;
        var showConfig = (!pollQuestions || pollQuestions.length <= 0 && (!PollQuestions || PollQuestions.length <= 0)) ? true : false;
        var userResponseCaption = (ResponseMsgToUser && ResponseMsgToUser.trim()) ? ResponseMsgToUser.trim() : strings.DefaultResponseMsgToUser;
        var submitButtonText = (BtnSubmitVoteText && BtnSubmitVoteText.trim()) ? BtnSubmitVoteText.trim() : strings.BtnSumbitVote;
        var nopollmsg = (NoPollMsg && NoPollMsg.trim()) ? NoPollMsg.trim() : strings.NoPollMsgDefault;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "Container" },
                React.createElement("div", { className: "mytrainings_column1" },
                    React.createElement(MyTrainings, null)),
                React.createElement("div", { className: "opinionpole_column3" },
                    React.createElement("div", { className: "cardHeader" },
                        React.createElement("div", { className: 'simplePoll' },
                            React.createElement("h2", null, "Quick Pole")),
                        !listExists ? (React.createElement(ProgressIndicator, { label: strings.ListCreationText, description: strings.PlsWait })) : (React.createElement(React.Fragment, null,
                            showConfig &&
                                React.createElement(Placeholder, { iconName: 'Edit', contentClassName: 'placeholder', iconText: "", description: strings.PlaceholderDescription, buttonLabel: strings.PlaceholderButtonLabel, onConfigure: this.props.openPropertyPane }),
                            showProgress && !showChart &&
                                React.createElement(ProgressIndicator, { label: strings.QuestionLoadingText, description: strings.PlsWait }),
                            !displayQuestion && !showConfig &&
                                React.createElement(MessageContainer, { MessageScope: MessageScope.Info, Message: nopollmsg }),
                            PollQuestions && PollQuestions.length > 0 && showOptions && displayQuestion &&
                                React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                                    React.createElement("div", { className: "ms-Grid-row" },
                                        React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-md12 ms-sm12" },
                                            React.createElement("div", { className: "ms-textAlignLeft ms-font-m-plus ms-fontWeight-semibold" }, displayQuestion.DisplayName))),
                                    React.createElement("div", { className: "ms-Grid-row" },
                                        React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-md12 ms-sm12" },
                                            React.createElement("div", { className: "ms-textAlignLeft ms-font-m-plus ms-fontWeight-semibold" },
                                                React.createElement(OptionsContainer, { disabled: !enableChoices, multiSelect: displayQuestion.MultiChoice, selectedKey: this._getSelectedKey, options: displayQuestion.Choices, label: "Pick One", onChange: this._onChange })))),
                                    React.createElement("div", { className: "ms-Grid-row" },
                                        React.createElement("div", { className: "ms-Grid-col ms-lg12 ms-md12 ms-sm12" },
                                            React.createElement("div", { className: "ms-textAlignCenter ms-font-m-plus ms-fontWeight-semibold" },
                                                React.createElement(PrimaryButton, { disabled: !enableSubmit, text: submitButtonText, onClick: this._submitVote.bind(this) })))),
                                    showSubmissionProgress && !showChartProgress &&
                                        React.createElement(ProgressIndicator, { label: strings.SubmissionLoadingText, description: strings.PlsWait })),
                            showMessage && MsgContent &&
                                React.createElement(MessageContainer, { MessageScope: (isError) ? MessageScope.Failure : MessageScope.Success, Message: MsgContent }),
                            showChartProgress && !showChart &&
                                React.createElement(ProgressIndicator, { label: "Loading the Poll analytics", description: "Getting all the responses..." }),
                            showChart &&
                                React.createElement(React.Fragment, null,
                                    React.createElement(QuickPollChart, { PollAnalytics: PollAnalytics, PropertyPane: this.props.openPropertyPane }),
                                    React.createElement(MessageContainer, { MessageScope: MessageScope.Info, Message: userResponseCaption + ": " + currentPollResponse })))))),
                React.createElement("div", { className: "mytasks_column2" },
                    React.createElement(MyTasks, null)))));
    };
    return SimplePoll;
}(React.Component));
export default SimplePoll;
//# sourceMappingURL=SimplePoll.js.map