import ReactGA, { gaOptions } from 'react-ga';

export const initGA = (trackingID) => {           
  ReactGA.initialize(
    trackingID
    // , {
     // debug: true,
     //   titleCase: false,
        // gaOptions: {
         // userId: 123,
         // siteSpeedSampleRate: 100
        // }
    // }
  ); 
}

export const PageView = () => {  
  ReactGA.pageview(window.location.pathname +  
                   window.location.search); 
}

export const Event = (category, action, label, value=undefined) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value
  });
};

//when user logs out, you need to unset the userId. To do that, you the above code and pass <User_ID> as null
export const SetUserID = (userId) => { 
  ReactGA.set({ userId: userId })
}

// render performance
export const GAtiming = (categoryName, variableName, valueNum) => {
  ReactGA.timing({       
      category: categoryName,       
      variable: variableName,       
      value: valueNum
  });
};

// Setting up multiple trackers

// Modal View Event

// Exception Event


