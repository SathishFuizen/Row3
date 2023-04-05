import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
import { IItemAddResult } from "@pnp/sp/items";
import { IUserInfo, IResponseDetails } from "../Models";
export default class SPHelper {
    private selectFields;
    private _list;
    private lst_response;
    constructor();
    /**
     * Get the current logged in user information
     */
    getCurrentUserInfo: () => Promise<IUserInfo>;
    /**
     * Get the poll response based on the question id.
     */
    getPollResponse: (questionId: string) => Promise<any>;
    /**
     * Add the user response.
     */
    addPollResponse: (userResponse: IResponseDetails, allUserResponse: any) => Promise<IItemAddResult>;
    /**
     * Update the over all response based on the end user response.
     */
    updatePollResponse: (questionId: string, allUserResponse: any) => Promise<void | import("@pnp/sp/items").IItemUpdateResult>;
    /**
     * Submit the user response.
     */
    submitResponse: (userResponse: IResponseDetails) => Promise<boolean>;
    /**
     * Check and create the User response list.
     */
    checkListExists: () => Promise<boolean>;
}
//# sourceMappingURL=SPHelper.d.ts.map