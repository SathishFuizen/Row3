import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import "@pnp/polyfill-ie11";
import { ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
export interface ISimplePollWebPartProps {
    pollQuestions: any[];
    MsgAfterSubmission: string;
    BtnSubmitVoteText: string;
    chartType: ChartType;
    ResponseMsgToUser: string;
    pollBasedOnDate: boolean;
    NoPollMsg: string;
}
export default class SimplePollWebPart extends BaseClientSideWebPart<ISimplePollWebPartProps> {
    private helper;
    private userinfo;
    protected onInit(): Promise<void>;
    render(): void;
    protected get disableReactivePropertyChanges(): boolean;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    private openPropertyPane;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=SimplePollWebPart.d.ts.map