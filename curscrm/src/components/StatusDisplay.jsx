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
                    color = '#ff1a35'
                    break
               default:
                    color = '#806CFB'
                    break
          }
          return color
     }

     return (
          <div className="status-display" style={{ color: getColor(status) }}>
               {status}
          </div>
     );
}

export default StatusDisplay;