import axios from "axios";
import moment from 'moment';
// import moment from "moment";

// export const getData = (number) => dispatch => {
//   // try {
//     dispatch({
//       type: "AWAITING_DATA"
//     })

//     const label = number
    
//     axios({
//       method: 'post',
//       url: 'http://localhost:8000/getanalysis/',
//       data: {
//         dimension: number,
//         lastName: 'Flintstone'
//       }
//     })
//     .then(response=> {
//     let dummy = [];

//     const labels = [];
//     const data = [];
//     const newdata = [];

//       let startDate = "11/22/2020";
//       let endDate = "22/12/2020";
//       while ( moment(startDate, "MM/DD/YYYY").valueOf() <= moment(endDate, "DD/MM/YYYY").valueOf()) {
//         labels.push(moment(startDate, "MM/DD/YYYY").format("YYYYMMDD"));
//         startDate = moment(startDate, "MM/DD/YYYY").add(1, "days").format("MM/DD/YYYY");
//       }
//       console.log(labels);

//     for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
//       newdata.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
//       dummy.push(response.data.reports[0].data.rows[i].dimensions[0])

//       // if (i === (number - 1)) {
//       //   break;
//       // }
//     }

//     for(let item of labels){
//       let found = null;
//       found = dummy.find((val, i)=> val==item);
//       let foundIndex = dummy.indexOf(found);
//       console.log(found);
//       if(found){
//         data.push(newdata[foundIndex]);
//       }else{
//         data.push("0");
//       }
//     }
//     console.log(data);
//     dispatch({
//       type: "SUCCESS_DATA",
//       payload: {
//         data,
//         labels,
//         label
//       }
//     })
//   }
//     )
//     .catch(e=> {
//       dispatch({
//         type: "REJECTED_DATA",
//       })
//     })
//   }




  export const getData = (number) => dispatch => {
    // try {
      dispatch({
        type: "AWAITING_DATA"
      })
  
      const label = number
      
      axios({
        method: 'post',
        url: 'http://localhost:8000/getanalysis/',
        data: {
          dimension: number,
          lastName: 'Flintstone'
        }
      })
      .then(response=> {
      let dummy = [];
  
      const labels = [];
      const data = [];
      const data1 = [];
      const newdata = [];
  
        let startDate = "11/22/2020";
        let endDate = "22/12/2020";
        while ( moment(startDate, "MM/DD/YYYY").valueOf() <= moment(endDate, "DD/MM/YYYY").valueOf()) {
          labels.push(moment(startDate, "MM/DD/YYYY").format("YYYYMMDD"));
          startDate = moment(startDate, "MM/DD/YYYY").add(1, "days").format("MM/DD/YYYY");
        }
        // console.log(labels);
  
      for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
        newdata.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
        dummy.push(response.data.reports[0].data.rows[i].dimensions)
  
        // if (i === (number - 1)) {
        //   break;
        // }
      }
  
      // for(let item of labels){
        // let found = null;

        // dummy.map((val, i)=> {
        //   if(val[1]== item){
        //     if(val[0]=="Returning Visitor"){
        //       data.push(newdata[i]);
        //     }
        //   }else{
        //     data.push("0");
        //   }

        //   if(val[1]== item){
        //     if(val[0]=="Returning Visitor"){
        //       data1.push(newdata[i]);
        //     }
        //   }else{
        //     data1.push("0");
        //   }
        // })
        let found1 = dummy.filter((val, i)=> val[0]=="Returning Visitor");
        let found2 = dummy.filter((val, i)=> val[0]=="New Visitor");
        // let foundIndex = dummy.indexOf(found);
        console.log(found1, found2);
        for(let item of labels){
          let found = null;
          let newFound = null;
          found = found1.find((val, i)=> val[1]==item);
          let foundIndex = dummy.indexOf(found);
          if(found){
            if(found[0]=='Returning Visitor'){
              data.push(newdata[foundIndex]);
            }
          }else{
            data.push("0");
          }

          newFound = found2.find((val, i)=> val[1]==item);
          let newFoundIndex = dummy.indexOf(newFound);
          if(newFound){
            if(newFound[0]=='New Visitor'){
              data1.push(newdata[newFoundIndex]);
            }
          }else{
            data1.push("0");
          }

        }
        // console.log(foundIndex);
     

      
      console.log(dummy);
      console.log(newdata);
      // console.log(data, data1);
      dispatch({
        type: "SUCCESS_DATA",
        payload: {
          data,
          data1,
          labels,
          label
        }
      })
    }
      )
      .catch(e=> {
        dispatch({
          type: "REJECTED_DATA",
        })
      })
    }






  export const getData1 = (number) => dispatch => {
    // try {
      dispatch({
        type: "AWAITING_USERCOUNT"
      })
  
      axios.get(`http://127.0.0.1:8000/getusercount/`)
      .then(response=> {
        console.log(response.data.reports[0].data.rows);
        const labels = [];
      const data = [];

      let date = [];

      let startDate = "02/20/2020";
      let endDate = "01/03/2020";
      while ( moment(startDate, "MM/DD/YYYY").valueOf() <= moment(endDate, "DD/MM/YYYY").valueOf()) {
        date.push(moment(startDate, "MM/DD/YYYY").format("MMM DD dddd"));
        startDate = moment(startDate, "MM/DD/YYYY").add(1, "days").format("MM/DD/YYYY");
      }
      console.log(date);

      for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
        data.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
        labels.push(response.data.reports[0].data.rows[i].dimensions)
  
        if (i === (number - 1)) {
          break;
        }
      }
      console.log(labels);
      console.log(data);
      dispatch({
        type: "SUCCESS_USERCOUNT",
        payload: {
          data,
          labels
        }
      })
    }
      )
      .catch(e=> {
        dispatch({
          type: "REJECTED_USERCOUNT",
        })
      })
    }

    export const getData2 = (number) => dispatch => {
      // try {
        dispatch({
          type: "AWAITING_USERTYPES"
        })

        const labels = [];
        const data = [];
        // const response = await axios.get(`http://127.0.0.1:8000/getanalysis/`)
        axios.get(`http://127.0.0.1:8000/getusertypes/`)
        .then(response=> {
          console.log(response.data.reports[0].data.rows);
        //   const labels = [];
        // const data = [];
        for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
          data.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
          labels.push(response.data.reports[0].data.rows[i].dimensions)
          if (i === (number - 1)) {
            break;
          }
        }
        console.log(labels);
        console.log(data);
        dispatch({
          type: "SUCCESS_USERTYPES",
          payload: {
            data,
            labels
          }
        })
      }
        )
        .catch(e=> {
          dispatch({
            type: "REJECTED_USERTYPES",
          })
        })
      }


      export const getData3 = (number) => dispatch => {
        // try {
          dispatch({
            type: "AWAITING_AGEGROUP"
          })
      
      
          const labels = [];
          const data = [];
          // const response = await axios.get(`http://127.0.0.1:8000/getanalysis/`)
          axios.get(`http://127.0.0.1:8000/getagegroup/`)
          .then(response=> {
            console.log(response.data.reports[0].data.rows);
          //   const labels = [];
          // const data = [];
          for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
            data.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
            labels.push(response.data.reports[0].data.rows[i].dimensions)
      
            // if (i === (number - 1)) {
            //   break;
            // }
          }
          console.log(labels);
          console.log(data);
          dispatch({
            type: "SUCCESS_AGEGROUP",
            payload: {
              data,
              labels
            }
          })
        }
          )
          .catch(e=> {
            dispatch({
              type: "REJECTED_AGEGROUP",
            })
          })
        }
  

//   export const getUserData = ({ number }) => dispatch => {
//     // try {
//       dispatch({
//         type: "AWAITING_DATA"
//       })
  
  
//       const labels = [];
//       const data = [];
//       // const response = await axios.get(`http://127.0.0.1:8000/getanalysis/`)
//       axios.get(`http://127.0.0.1:8000/getanalysis/`)
//       .then(response=> {
//         console.log(response.data.reports[0].data.rows);
//       //   const labels = [];
//       // const data = [];
//       for (let i = 0; i < response.data.reports[0].data.rows.length; i++) {
//         data.push(response.data.reports[0].data.rows[i].metrics[0].values[0])
//         labels.push(response.data.reports[0].data.rows[i].dimensions)
  
//         if (i === (number - 1)) {
//           break;
//         }
//       }
//       console.log(labels);
//       console.log(data);
//       dispatch({
//         type: "SUCCESS_DATA",
//         payload: {
//           data,
//           labels
//         }
//       })
//     }
//       )
//       .catch(e=> {
//         dispatch({
//           type: "REJECTED_DATA",
//         })
//       })
//     }


//     // console.log(response.data);

// //     const labels = [];
// //     const data = [];
// //     for (let i = 0; i < response.data.data.length; i++) {
// //       data.unshift(response.data.data[i].employee_salary)
// //       labels.unshift(response.data.data[i].employee_name)

// //       if (i === (number - 1)) {
// //         break;
// //       }
// //     }
// //     console.log(labels);
//     console.log(data);
//     dispatch({
//       type: "SUCCESS_DATA",
//       payload: {
//         data,
//         labels
//       }
//     })
//   } catch (e) {
//     dispatch({
//       type: "REJECTED_DATA",
//     })
//   }
// }
