import * as React from 'react';
import './SimplePoll.scss';
import { ISimplePollProps } from './ISimplePollProps';
import { ISimplePollState } from './ISimplePollState';
export default class SimplePoll extends React.Component<ISimplePollProps, ISimplePollState> {
    private helper;
    private disQuestionId;
    private displayQuestion;
    constructor(props: ISimplePollProps);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: ISimplePollProps) => void;
    private checkAndCreateList;
    private getQuestions;
    private getDisplayQuestionID;
    private bindPolls;
    private _onChange;
    private _getSelectedKey;
    private _submitVote;
    private getAllUsersResponse;
    private bindResponseAnalytics;
    private getUserResponse;
    render(): React.ReactElement<ISimplePollProps>;
}
//# sourceMappingURL=SimplePoll.d.ts.map