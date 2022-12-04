const PriorityDisplay = ({ priority }) => {
     return (
          <div className="priority-display">
               <div className="star-container">
                    <span style={{
                         color: priority >= 1
                              ? '#FFD055 !important'
                              : ''
                    }}>★</span>
                    <span style={{
                         color: priority >= 2
                              ? '#FFD055 !important'
                              : ''
                    }}>★</span>
                    <span style={{
                         color: priority >= 3
                              ? '#FFD055 !important'
                              : ''
                    }}>★</span>
                    <span style={{
                         color: priority >= 4
                              ? '#FFD055 !important'
                              : ''
                    }}>★</span>
                    <span style={{
                         color: priority >= 5
                              ? '#FFD055 !important'
                              : ''
                    }}>★</span>
               </div>
          </div>
     );
}

export default PriorityDisplay;