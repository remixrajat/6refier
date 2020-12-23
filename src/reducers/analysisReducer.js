const initalState = {
    loading: false,
    data: {
      labels: [],
      datasets: [{
        label: "Aalooo khana hai",
        data: [],
        backgroundColor: 'rgba(238,175,0, 0.4)',
        borderColor: 'rgba(238,175,0, 0.5)',
        pointBorderColor: 'rgba(238,175,0, 0.7)',

      },
      {
        label: "KAloo",
        data: [],
        backgroundColor: 'rgba(50,50,50, 0.4)',
        borderColor: 'rgba(238,175,0, 0.5)',
        pointBorderColor: 'rgba(238,175,0, 0.7)',
        
      }
    ]
    }
  };
  
  export const analysisReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AWAITING_DATA":
        return {
          ...state,
          loading: true
        }
      case "REJECTED_DATA":
        return {
          ...state,
          loading: false,
        }
      case "SUCCESS_DATA":
        return {
          ...state,
          loading: false,
          data: {
            labels: payload.labels,
            datasets: [{
              label: payload.label,
              data: payload.data,
              backgroundColor: 'rgba(238,175,0, 0.4)',
              borderColor: 'rgba(238,175,0, 0.5)',
              pointBorderColor: 'rgba(238,175,0, 0.7)'
            },
            {
              label: payload.label,
              data: payload.data1,
              backgroundColor: 'rgba(50,50,50, 0.4)',
              borderColor: 'rgba(238,175,0, 0.5)',
              pointBorderColor: 'rgba(238,175,0, 0.7)',
            }
          ]
          }
        }
      default:
        return state;
    }
    return state;
  }

  export const useranalysisReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AWAITING_USERCOUNT":
        return {
          ...state,
          loading: true
        }
      case "REJECTED_USERCOUNT":
        return {
          ...state,
          loading: false,
        }
        case "SUCCESS_USERCOUNT":
          return {
            ...state,
            loading: false,
            data: {
              labels: payload.labels,
              datasets: [{
                label: payload.label,
                data: payload.data,
                backgroundColor: 'rgba(238,175,0, 0.4)',
                borderColor: 'rgba(238,175,0, 0.5)',
                pointBorderColor: 'rgba(238,175,0, 0.7)'
              }]
            }
          }
      default:
        return state;
    }
    return state;
  }
  

  export const usertypesReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AWAITING_USERTYPES":
        return {
          ...state,
          loading: true
        }
      case "REJECTED_USERTYPES":
        return {
          ...state,
          loading: false,
        }
        case "SUCCESS_USERTYPES":
          return {
            ...state,
            loading: false,
            data: {
              labels: payload.labels,
              datasets: [{
                label: "Page Analysis Details",
                data: payload.data,
                backgroundColor: 'rgba(238,175,0, 0.4)',
                borderColor: 'rgba(238,175,0, 0.5)',
                pointBorderColor: 'rgba(238,175,0, 0.7)'
              }]
            }
          }
      default:
        return state;
    }
    // return state;
  }


  export const useragetypeReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "AWAITING_AGEGROUP":
        return {
          ...state,
          loading: true
        }
      case "REJECTED_AGEGROUP":
        return {
          ...state,
          loading: false,
        }
        case "SUCCESS_AGEGROUP":
          return {
            ...state,
            loading: false,
            data: {
              labels: payload.labels,
              datasets: [{
                label: "Page Analysis Details",
                data: payload.data,
                backgroundColor: 'rgba(238,175,0, 0.4)',
                borderColor: 'rgba(238,175,0, 0.5)',
                pointBorderColor: 'rgba(238,175,0, 0.7)'
              }]
            }
          }
      default:
        return state;
    }
    return state;
  }
  