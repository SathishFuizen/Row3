import * as React from "react";
import { useState, useEffect } from "react";
import { sp } from "@pnp/sp"; 
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
import "./../SimplePoll.scss";
import SPHelper from "../../../../Common/SPHelper";
import { IUserInfo } from "../../../../Models";

import { Web } from "@pnp/sp/webs";
// import { IList } from "@pnp/sp/lists";
// import { IItemAddResult } from "@pnp/sp/items";

const MyTrainings = () => {
  const [trainingdata, setTrainingData] = useState([]);
  const [currentuser, setCurrentUser] = useState("");
  //const [manager, setManager]=useState('');

  // const   getCurrentUserInfo = async ()  => {

  //     let userinfo: IUserInfo = null;
  //     let currentUserInfo = await sp.web.currentUser.get();

  //     userinfo = {
  //         ID: currentUserInfo.Id.toString(),
  //         Email: currentUserInfo.Email,
  //         LoginName: currentUserInfo.LoginName,
  //         DisplayName: currentUserInfo.Title,
  //         Picture: '/_layouts/15/userphoto.aspx?size=S&username=' + currentUserInfo.UserPrincipalName,

  //     };

  //     return userinfo;
  // }

  const getTrainingDetails = async () => {
    try {
      const webUrl = `${window.location.protocol}//${window.location.hostname}/sites/Dev/LearingManag`;
      const k= Web(webUrl);
console.log(k);
      const trainingoutput=await k.lists.getByTitle("Training")
      .items.select("Title", "Description")
      .get();
console.log(trainingoutput);


      // const trainingInfo = await sp.web.lists
      //   .getByTitle("Training")
      //   .items.select("Title", "Description")
      //   .get();

     
      setTrainingData(trainingoutput);
      console.log(trainingoutput);

      // console.log(manager,"here is manager");
    } catch (e) {
      console.log(e);
    }
  }; //function end
  // const  getReportingManager = async()=>{
  //   try{
  //    const reportingManger= await sp.web.lists.getByTitle('Department').items.select('DepID', 'Reporting Manager').get();
  //  // const actualresult=JSON.parse(trainingInfo);

  //    console.log(reportingManger);
  //    setManager(reportingManger);
  //     console.log(manager);

  //   }
  //   catch(e){
  //    console.log(e);
  //   }

  //}//function end

  const sendemail = async (Title: any) => {
    //get currentuser info
    try{
    let userInfo = new SPHelper();
    let arrayUserInfo = userInfo.getCurrentUserInfo();
    let userobj = "";
    arrayUserInfo.then((x) => {
      userobj = x.Email;
      console.log(userobj);
    });
    setCurrentUser(userobj);
    console.log(currentuser);

    console.log(arrayUserInfo);

    //get managerinfo
    let parentcontext = await sp.web.getParentWeb();
   // let contextinfo = JSON.stringify(parentcontext);
    console.log(currentuser, "hi");
    const webUrl = `${window.location.protocol}//${window.location.hostname}/sites/Dev`;
     const k= Web(webUrl);
    const empInfo = k.lists
      .getByTitle("EmployeeDetails")
      .items.select("ReportingManager/EMail")
      .expand("ReportingManager")
      .filter("Name/EMail eq '" + userobj + "'")
      .get();
    let actualmanager = "";
    empInfo.then((responsedata: any) => {
      console.log(responsedata);
      let y = JSON.parse(JSON.stringify(responsedata));
      y.map((x: any) => {
        actualmanager = x.ReportingManager.EMail;
        console.log(x.ReportingManager.EMail);
      });
      console.log(currentuser, actualmanager);
      //sending email
      sp.utility.sendEmail({
        To: [actualmanager],

        Subject: "Request for" + Title,
        Body: "Iam interested in" + Title,
        AdditionalHeaders: {
          "content-type": "text/html",
        },
      });
      window.alert("Request for Nomination Sent");
      console.log("emailsent");
    });
  }
  catch(e){
    console.log(e);
  }
    // setManager(actualmanager);
  };

  React.useEffect(() => {
    try {
      console.log("hi");
      getTrainingDetails();
      console.log("hello");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="training_div">
        <div className="cardHeader">
          <h2>My Tainings</h2>
        </div>
        {/* border=2 width=80% style="font-family: "Trebuchet MS", Arial, Helvetica, sans-serif; */}
        {console.log(trainingdata)}
        {/* {console.log(actualmanager)} */}
        <table className="training_table">
          <th>Title</th>
          
          <th>Apply</th>
          {trainingdata &&
            trainingdata?.map((item, i) => {
              return (
                <tr>
                  <td>
                    <label> {item.Title}</label>
                  </td>
                  
                

                  <td>
                    
                    <button
                      id="nominate_btn${i}"
                      className="nominate1"
                      onClick={() => sendemail(item.Title)}
                    >
                      Nominate
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default MyTrainings;
