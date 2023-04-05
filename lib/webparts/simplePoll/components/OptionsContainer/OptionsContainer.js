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
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { List } from 'office-ui-fabric-react/lib/List';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as _ from 'lodash';
var OptionsContainer = /** @class */ (function (_super) {
    __extends(OptionsContainer, _super);
    function OptionsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.getOptions = function () {
            var tempChoices = [];
            if (_this.props.options.indexOf(',') >= 0) {
                var tmpChoices = _this.props.options.split(',');
                tmpChoices.map(function (choice) {
                    if (choice && choice.trim().length > 0)
                        tempChoices.push(choice);
                });
            }
            else
                tempChoices.push(_this.props.options);
            return tempChoices;
        };
        _this._onRenderCell = function (item, index) {
            if (item && item.length > 0) {
                return (React.createElement("div", { style: { marginBottom: "15px" } },
                    React.createElement(Checkbox, { label: item, onChange: _this._makeChangeHandler(item) })));
            }
        };
        _this._getSelectedKey = function () {
            return _this.props.selectedKey();
        };
        _this._onChange = function (ev, option) {
            _this.props.onChange(ev, option, false);
        };
        _this._makeChangeHandler = function (item) {
            return function (ev, checked) { return _this._onCheckboxChange(ev, checked, item); };
        };
        _this._onCheckboxChange = function (ev, isChecked, item) {
            var finalSel = _this.state.selChoices;
            if (finalSel.length > 0) {
                if (isChecked) {
                    finalSel.push(item);
                }
                else
                    finalSel = _.filter(finalSel, function (o) { return o !== item; });
            }
            else {
                if (isChecked)
                    finalSel.push(item);
            }
            _this.setState({ selChoices: finalSel });
            _this.props.onChange(ev, { key: finalSel }, true);
        };
        _this.state = {
            selChoices: []
        };
        return _this;
    }
    OptionsContainer.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, selectedKey = _a.selectedKey, label = _a.label, options = _a.options, onChange = _a.onChange, multiSelect = _a.multiSelect;
        return (React.createElement("div", null, multiSelect ? (React.createElement("div", { style: { paddingTop: "15px" } },
            React.createElement(List, { items: this.getOptions(), onRenderCell: this._onRenderCell }))) : (React.createElement(ChoiceGroup, { disabled: disabled, selectedKey: this._getSelectedKey(), options: this.onRenderChoiceOptions(), required: true, label: "", onChange: this._onChange }))));
    };
    OptionsContainer.prototype.onRenderChoiceOptions = function () {
        var choices = [];
        var tempChoices = this.getOptions();
        if (tempChoices.length > 0) {
            tempChoices.map(function (choice) {
                choices.push({
                    key: choice.trim(),
                    text: choice.trim()
                });
            });
        }
        else {
            choices.push({
                key: '0',
                text: "Sorry, no choices found",
                disabled: true,
            });
        }
        return choices;
    };
    return OptionsContainer;
}(React.Component));
export default OptionsContainer;
//# sourceMappingURL=OptionsContainer.js.map