const StatusDisplay = ({ status }) => {

     const getColor = (status) => {
          let color
          switch (status) {
               case 'done':
                    color = '#20B038'
                    break
               case 'working on it':
                    color = '#FFD055'
                    break
               case 'stuck':
                    color = '#FF3B51'
                    break
               default:
                    color = '#806CFB'
                    break
          }
          return color
     }

     return (
          <div className="status-display" style={{ backgroundColor: getColor(status) }}>
               {status}
          </div>
     );
}

export default StatusDisplay;