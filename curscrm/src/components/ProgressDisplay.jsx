const ProgressDisplay = ({ progress }) => {
     return (
          <div className="progress-display mt-2">
               <div className="progress-bar">
                    <div style={{ width: progress + "%" }}
                         className="progress-indicator">
                         {
                              progress > 5 && (
                                   <span>{progress + "%"}</span>
                              )
                         }

                    </div>
               </div>
          </div>
     );
}

export default ProgressDisplay;