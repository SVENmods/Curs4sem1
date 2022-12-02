const PriorityDisplay = ({ priority }) => {
     return (
          <div className="priority-display">
               <div className="star-container">
                    <h3 style={{
                         color: priority >= 1
                              ? '#FFD055'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: priority >= 2
                              ? '#FFD055'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: priority >= 3
                              ? '#FFD055'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: priority >= 4
                              ? '#FFD055'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: priority >= 5
                              ? '#FFD055'
                              : ''
                    }}>★</h3>
               </div>
          </div>
     );
}

export default PriorityDisplay;