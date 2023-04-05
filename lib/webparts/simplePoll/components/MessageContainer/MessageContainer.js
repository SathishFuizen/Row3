import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import styles from './MessageContainer.module.scss';
import { MessageScope } from '../../../../Common/enumHelper';
export default function MessageContainer(props) {
    return (React.createElement("div", { className: styles.MessageContainer },
        props.MessageScope === MessageScope.Success &&
            React.createElement(MessageBar, { messageBarType: MessageBarType.success },
                React.createElement(Text, { block: true, variant: "mediumPlus" }, props.Message)),
        props.MessageScope === MessageScope.Failure &&
            React.createElement(MessageBar, { messageBarType: MessageBarType.error },
                React.createElement(Text, { block: true, variant: "mediumPlus" }, props.Message)),
        props.MessageScope === MessageScope.Warning &&
            React.createElement(MessageBar, { messageBarType: MessageBarType.warning },
                React.createElement(Text, { block: true, variant: "mediumPlus" }, props.Message)),
        props.MessageScope === MessageScope.Info &&
            React.createElement(MessageBar, { className: styles.infoMessage },
                React.createElement(Text, { block: true, variant: "mediumPlus" }, props.Message))));
}
//# sourceMappingURL=MessageContainer.js.map