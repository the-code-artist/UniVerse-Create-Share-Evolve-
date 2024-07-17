const Table = ({ data }) => {
    return (
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => { window.location.href = `/profile/${item.id}` }}>
              <td className="accounts">
                  <img src={"/upload/" + item.profilePic} alt="check" />
                  <td>{item.name}</td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }; 
  
  export default Table;