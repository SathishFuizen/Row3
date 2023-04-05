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
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
var SPHelper = /** @class */ (function () {
    function SPHelper() {
        var _this = this;
        this.selectFields = ["ID", "Title", "QuestionID", "UserResponse"];
        this._list = null;
        this.lst_response = "";
        /**
         * Get the current logged in user information
         */
        this.getCurrentUserInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var userinfo, currentUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userinfo = null;
                        return [4 /*yield*/, sp.web.currentUser.get()];
                    case 1:
                        currentUserInfo = _a.sent();
                        userinfo = {
                            ID: currentUserInfo.Id.toString(),
                            Email: currentUserInfo.Email,
                            LoginName: currentUserInfo.LoginName,
                            DisplayName: currentUserInfo.Title,
                            Picture: '/_layouts/15/userphoto.aspx?size=S&username=' + currentUserInfo.UserPrincipalName,
                        };
                        return [2 /*return*/, userinfo];
                }
            });
        }); };
        /**
         * Get the poll response based on the question id.
         */
        this.getPollResponse = function (questionId) { return __awaiter(_this, void 0, void 0, function () {
            var questionResponse, tmpResponse, jsonQResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._list.items.select(this.selectFields.join(','))
                            .filter("QuestionID eq '" + questionId + "'").expand('FieldValuesAsText').get()];
                    case 1:
                        questionResponse = _a.sent();
                        if (questionResponse.length > 0) {
                            tmpResponse = questionResponse[0].FieldValuesAsText.UserResponse;
                            if (tmpResponse != undefined && tmpResponse != null && tmpResponse !== "") {
                                jsonQResponse = JSON.parse(tmpResponse);
                                return [2 /*return*/, jsonQResponse];
                            }
                            else
                                return [2 /*return*/, []];
                        }
                        else
                            return [2 /*return*/, []];
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Add the user response.
         */
        this.addPollResponse = function (userResponse, allUserResponse) { return __awaiter(_this, void 0, void 0, function () {
            var addedresponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._list.items.add({
                            Title: userResponse.PollQuestion,
                            QuestionID: userResponse.PollQuestionId,
                            UserResponse: JSON.stringify(allUserResponse)
                        })];
                    case 1:
                        addedresponse = _a.sent();
                        return [2 /*return*/, addedresponse];
                }
            });
        }); };
        /**
         * Update the over all response based on the end user response.
         */
        this.updatePollResponse = function (questionId, allUserResponse) { return __awaiter(_this, void 0, void 0, function () {
            var response, updatedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._list.items.select(this.selectFields.join(','))
                            .filter("QuestionID eq '" + questionId + "'").expand('FieldValuesAsText').get()];
                    case 1:
                        response = _a.sent();
                        if (!(response.length > 0)) return [3 /*break*/, 5];
                        if (!(allUserResponse.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._list.items.getById(response[0].ID).update({
                                UserResponse: JSON.stringify(allUserResponse)
                            })];
                    case 2:
                        updatedResponse = _a.sent();
                        return [2 /*return*/, updatedResponse];
                    case 3: return [4 /*yield*/, this._list.items.getById(response[0].ID).delete()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Submit the user response.
         */
        this.submitResponse = function (userResponse) { return __awaiter(_this, void 0, void 0, function () {
            var allUserResponse, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getPollResponse(userResponse.PollQuestionId)];
                    case 1:
                        allUserResponse = _a.sent();
                        if (!(allUserResponse.length > 0)) return [3 /*break*/, 3];
                        allUserResponse.push({
                            UserID: userResponse.UserID,
                            UserName: userResponse.UserDisplayName,
                            Response: userResponse.PollResponse,
                            MultiResponse: userResponse.PollMultiResponse,
                        });
                        // Update the user response
                        return [4 /*yield*/, this.updatePollResponse(userResponse.PollQuestionId, allUserResponse)];
                    case 2:
                        // Update the user response
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        allUserResponse.push({
                            UserID: userResponse.UserID,
                            UserName: userResponse.UserDisplayName,
                            Response: userResponse.PollResponse,
                            MultiResponse: userResponse.PollMultiResponse,
                        });
                        // Add the user response
                        return [4 /*yield*/, this.addPollResponse(userResponse, allUserResponse)];
                    case 4:
                        // Add the user response
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, true];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Check and create the User response list.
         */
        this.checkListExists = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            sp.web.lists.getByTitle(this.lst_response).get().then(function (listExists) {
                                res(true);
                            }).catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var listExists, allItemsView;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sp.web.lists.ensure(this.lst_response)];
                                        case 1: return [4 /*yield*/, (_a.sent()).list];
                                        case 2:
                                            listExists = _a.sent();
                                            return [4 /*yield*/, listExists.fields.addText('QuestionID', 255, { Required: true, Description: '' })];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, listExists.fields.addMultilineText('UserResponse', 6, false, false, false, false, { Required: false, Description: '' })];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, listExists.views.getByTitle('All Items')];
                                        case 5:
                                            allItemsView = _a.sent();
                                            return [4 /*yield*/, allItemsView.fields.add('QuestionID')];
                                        case 6:
                                            _a.sent();
                                            return [4 /*yield*/, allItemsView.fields.add('UserResponse')];
                                        case 7:
                                            _a.sent();
                                            res(true);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        }); };
        this.lst_response = "QuickPoll";
        this._list = sp.web.lists.getByTitle(this.lst_response);
    }
    return SPHelper;
}());
export default SPHelper;
//# sourceMappingURL=SPHelper.js.map