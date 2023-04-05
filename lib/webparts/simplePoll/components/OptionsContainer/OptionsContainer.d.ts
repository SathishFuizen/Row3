import * as React from 'react';
import { IOptionsContainerProps } from './IOptionsContainerProps';
export interface IOptionsContainerState {
    selChoices?: string[];
}
export default class OptionsContainer extends React.Component<IOptionsContainerProps, IOptionsContainerState> {
    constructor(props: IOptionsContainerProps);
    render(): JSX.Element;
    private getOptions;
    private _onRenderCell;
    private onRenderChoiceOptions;
    private _getSelectedKey;
    private _onChange;
    private _makeChangeHandler;
    private _onCheckboxChange;
}
//# sourceMappingURL=OptionsContainer.d.ts.map