const PriorityDisplay = ({ rate }) => {
     return (
          <div className="priority-display mt-1">
               <div className="star-container">
                    <h3 style={{
                         color: rate >= 1
                              ? 'rgb(255, 208, 85)'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: rate >= 2
                              ? 'rgb(255, 208, 85)'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: rate >= 3
                              ? 'rgb(255, 208, 85)'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: rate >= 4
                              ? 'rgb(255, 208, 85)'
                              : ''
                    }}>★</h3>
                    <h3 style={{
                         color: rate >= 5
                              ? 'rgb(255, 208, 85)'
                              : ''
                    }}>★</h3>
               </div>
          </div>
     );
}

export default PriorityDisplay;